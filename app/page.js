import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to the flashcard generation page
  redirect("/GenerateFlashCards");
}
