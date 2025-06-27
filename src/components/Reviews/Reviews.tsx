
'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Avatar } from "@/components/ui/avatar"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { StarIcon } from "lucide-react"
import { Review } from "@/lib/types/interfaces"

declare global {
  interface Window {
    google: any
  }
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [googleJwt, setGoogleJwt] = useState<string | null>(null)
  const [userProfile, setUserProfile] = useState<{ name?: string; email?: string; picture?: string } | null>(null)
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(5)
  const [loading, setLoading] = useState(false)

  const triedSubmitRef = useRef(false)

  async function fetchReviews() {
    try {
      const res = await fetch('/api/reviews')
      const data = await res.json()
      setReviews(data.reviews)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  useEffect(() => {
    if (!window.google) return

    window.google.accounts.id.initialize({
client_id: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID,
  callback: (response: any) => {

        setGoogleJwt(response.credential)
        const base64Url = response.credential.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        )
        const profile = JSON.parse(jsonPayload)
        setUserProfile({
          name: profile.name,
          email: profile.email,
          picture: profile.picture,
        })

        if (triedSubmitRef.current) {
          triedSubmitRef.current = false
          submitReview(true)
        }
      },
    })

    window.google.accounts.id.renderButton(
      document.getElementById('google-signin'),
      { theme: 'outline', size: 'large' }
    )
  }, [])

async function submitReview(afterLogin = false) {
  if (!googleJwt) {
    triedSubmitRef.current = true
    if (window.google?.accounts?.id?.prompt) {
      window.google.accounts.id.prompt()
    } else {
      alert('Google Identity Services не готовы. Попробуйте обновить страницу.')
    }
    return
  }

  if (!comment.trim()) {
    alert('Введите текст отзыва')
    return
  }

  const payload = {
    token: googleJwt,
    comment,
    rating,
    userId: userProfile?.email || '', // Используем email как ID
    name: userProfile?.name || 'Аноним',
    email: userProfile?.email || '',
    image: userProfile?.picture || '',
  }

  setLoading(true)
  try {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) throw new Error('Ошибка отправки')

    if (!afterLogin) alert('Спасибо за отзыв!')

    setComment('')
    setRating(5)
    fetchReviews()
  } catch (e) {
    alert('Ошибка при отправке отзыва')
    console.error(e)
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-6">
      <h2 className="mb-8 text-5xl font-bold text-center tracking-tight">Отзывы</h2>

      {!googleJwt && (
        <div id="google-signin" className="mb-6" />
      )}

      <div className="mb-8 w-full max-w-md border p-6 rounded-md shadow-sm">
      <div className="flex items-center gap-4 mb-4">
  <Avatar>
    {userProfile?.picture ? (
      <AspectRatio ratio={1 / 1}>
        <Image
          src={userProfile.picture}
          alt={userProfile.name || 'User picture'}
          width={48}
          height={48}
          className="rounded-full"
        />
      </AspectRatio>
    ) : (
      <div className="w-12 h-12 bg-gray-300 rounded-full" />
    )}
  </Avatar>
  <div className="flex flex-col">
    <p className="font-semibold flex items-center gap-2">
      {userProfile?.name || 'Гость'}
     
    </p>
    <p className="text-sm text-gray-500">{userProfile?.email || 'Не авторизован'}</p>
  </div>
</div>


        <div className="mb-4">
          <label className="block mb-1 font-semibold">Оценка:</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`cursor-pointer ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-400'
                }`}
                aria-label={`Оценка ${star} звёзд`}
              >
                <StarIcon className="w-6 h-6" />
              </button>
            ))}
          </div>
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Напишите ваш отзыв..."
          className="w-full textarea textarea-bordered resize-none mb-4"
          rows={4}
        />

        <button
          disabled={loading}
          onClick={() => submitReview(false)}
          className="btn btn-primary w-full"
        >
          {loading ? 'Отправка...' : 'Отправить отзыв'}
        </button>
      </div>

      <div className="w-full max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex flex-col border border-gray-200 rounded-lg p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                {Array(review.rating)
                  .fill(0)
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      className="w-5 h-5 fill-yellow-400 stroke-yellow-400"
                    />
                  ))}
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <Avatar>
                  {review.image ? (
                    <AspectRatio ratio={1 / 1}>
                      <Image
                        src={review.image}
                        alt={`${review.name}'s picture`}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    </AspectRatio>
                  ) : (
                    <div className="w-12 h-12 bg-gray-300 rounded-full" />
                  )}
                </Avatar>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
