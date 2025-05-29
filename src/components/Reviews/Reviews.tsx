'use client'
import { Avatar } from "@/components/ui/avatar";
import { Review } from "@/lib/types/interfaces";
import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
// import {  useSession } from "next-auth/react";
// import { signIn } from "@/lib/auth";
// import { Button } from "../ui/button";


export default function Reviews() {
    // const { data: session } = useSession();
    const [reviews, setReviews] = useState<Review[]>([]);
    // const [comment, setComment] = useState("");
    // const [rating, setRating] = useState(5);
    // const [editingReviewId, setEditingReviewId] = useState<string | null>(null);


    const fetchReviews = async () => {
        try {
            const res = await fetch(`/api/reviews`);
            const data = await res.json();
            setReviews(data.reviews);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     if (!session) {
    //         return;
    //     }

    //     const body = {
    //         name: session.user?.name,
    //         rating,
    //         comment,
    //         email: session.user?.email,
    //         image: session.user?.image,
    //         userId: session.user?.id,
    //         likes: [] ,
    //         dislikes: [] ,
    //     };

    //     try {
    //         const res = await fetch(`/api/reviews`, 

    //             {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(body),
    //         });

    //         if (!res.ok) {
    //             throw new Error("Failed to submit review");
    //         }

    //         await fetchReviews();
    //         setComment("");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const handleEdit = (review: Review) => {
    //     setEditingReviewId(review._id);
    //     setComment(review.comment);
    //     setRating(review.rating);
    // };

    // const handleDelete = async (reviewId: string) => {
    //     try {
    //         const res = await fetch(`/api/reviews`, 

    //             {
    //             method: "DELETE",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ id: reviewId }),
    //         });

    //         if (!res.ok) {
    //             throw new Error("Failed to delete review");
    //         }

    //         await fetchReviews();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     if (!session || !editingReviewId) {
    //         return;
    //     }

    //     const body = {
    //         id: editingReviewId,
    //         comment,
    //         rating,
    //     };

    //     try {
    //         const res = await fetch(`/api/reviews`, 

    //             {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(body),
    //         });

    //         if (!res.ok) {
    //             throw new Error("Failed to update review");
    //         }

    //         await fetchReviews();
    //         setComment("");
    //         setEditingReviewId(null);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
  
    // const handleLikeOrDislike = async (review: Review, action: 'like' | 'dislike') => {
    //     if (!session) {
    //         console.error("Пользователь не аутентифицирован");
    //         return; // Выходим, если сессия отсутствует
    //     }
    
    //     try {
    //         const response = await fetch(`/api/reviews/${review._id}`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ userId: session.user.id, action }), // Передаем ID пользователя и действие
    //         });
    
    //         if (!response.ok) {
    //             throw new Error(`Не удалось ${action === 'like' ? 'поставить лайк' : 'поставить дизлайк'}`);
    //         }
    
    //         const result = await response.json();
    //         console.log("Количество лайков", result.likesCount);
    //         console.log("Количество дизлайков", result.dislikesCount);
    //         await fetchReviews(); // Обновляем список отзывов
    //     } catch (error) {
    //         console.error(`Ошибка при ${action === 'like' ? 'ставлении лайка' : 'ставлении дизлайка'}:`, error);
    //     }
    // };
    
return(
  <div className="min-h-screen flex justify-center items-center py-12 px-6">
    <div>
      <h2 className="mb-8 sm:mb-14 text-5xl md:text-6xl font-bold text-center tracking-tight">
        Отзывы
      </h2>
      {/* {session ? (
    <div className="w-full flex flex-col justify-center items-center">
        <div className="flex gap-1 items-center">
            {session.user?.image ? (
                <Image
                    src={session.user.image}
                    alt={`Profile image`}
                    className="rounded-box"
                    width={30}
                    height={30}
                />
            ) : (
                <div className="rounded-box bg-gray-300 w-8 h-8" /> // Плейсхолдер для изображения
            )}
            <p>{session.user?.name}</p>
            <Button  className="w-max h-max text-xs m-0 p-1 btn-xs btn-outline" onClick={() => signIn("google")} >Сменить акаунт</Button>
        </div>
        <form onSubmit={handleSubmit} className="mx-auto w-max flex flex-col ">
            <div className="rating mx-auto my-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <input
                        key={star}
                        type="radio"
                        name="rating"
                        value={star}
                        className="mask mask-star-2 bg-orange-400"
                        checked={rating === star}
                        onChange={() => setRating(star)}
                    />
                ))}
            </div>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Напишите отзыв..."
                className="textarea textarea-bordered textarea-lg w-max mb-3"
            />
            <Button  type="submit"  >
            {editingReviewId ? "Обновить отзыв" : "Отправить отзыв"}
            </Button>
        </form>
    </div>
) : (
    <Button type="button" onClick={() => signIn("google")} className="w-max flex self-center mx-auto btn-success">Оставить отзыв</Button>
)} */}
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden border-r border-background">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex flex-col outline outline-border px-6 py-8"
            >
              <div className="flex items-center justify-center gap-2">
                <StarIcon className="w-6 h-6 fill-yellow-500 stroke-yellow-500" />
                <StarIcon className="w-6 h-6 fill-yellow-500 stroke-yellow-500" />
                <StarIcon className="w-6 h-6 fill-yellow-500 stroke-yellow-500" />
                <StarIcon className="w-6 h-6 fill-yellow-500 stroke-yellow-500" />
                <StarIcon className="w-6 h-6 fill-yellow-500 stroke-yellow-500" />
              </div>
              <p className="my-6 text-[17px] text-center max-w-md">
                {/* &quot;{testimonial.testimonial}&quot; */}
              </p>
              <div className="mt-auto flex items-center justify-center gap-3">
                <Avatar> 
                  {review.image && (
                  <AspectRatio ratio={1 / 1}>
                            <Image
                                src={review.image}
                                alt={`${review.name}'s picture`}
                                width={48}
                                height={48}
                            />
                        </AspectRatio>               
                        )}  
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">{review.name}</p>
                  <p className="text-sm text-gray-500">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>)
}
