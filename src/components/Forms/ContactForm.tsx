import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function ContactForm() {
  return (
    <Card className="bg-accent shadow-none">
    <CardContent className="p-6 md:p-10">
      <form>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="firstName">Фамилия</Label>
            <Input
              placeholder="Фамилия"
              id="firstName"
              className="mt-1.5 bg-white h-11 shadow-none"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="lastName">Имя</Label>
            <Input
              placeholder="Имя"
              id="lastName"
              className="mt-1.5 bg-white h-11 shadow-none"
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="email">Почта</Label>
            <Input
              type="email"
              placeholder="Почта"
              id="email"
              className="mt-1.5 bg-white h-11 shadow-none"
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="message">Сообщение</Label>
            <Textarea
              id="message"
              placeholder="Сообшение"
              className="mt-1.5 bg-white shadow-none"
              rows={6}
            />
          </div>
          <div className="col-span-2 flex items-center gap-2">
            <Checkbox id="acceptTerms" />
            <Label htmlFor="acceptTerms">
              
              <Link href="#" className="underline">
              Я сошлашаюсь с {" "} политикой конфиденциальности сайта.
              </Link>
              .
            </Label>
          </div>
        </div>
        <Button className="mt-6 w-full" size="lg">
          Отправить
        </Button>
      </form>
    </CardContent>
  </Card>
  );
}