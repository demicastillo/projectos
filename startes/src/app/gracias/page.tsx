import { pageMetadata } from "@/lib/metadata";
import { ThanksMessage } from "./ThanksMessage";

export const metadata = pageMetadata({
  title: "Gracias por tu consulta",
  description: "Confirmación de consulta enviada a StartEs.",
  path: "/gracias",
  index: false,
});

export default function GraciasPage() {
  return (
    <section>
      <div className="container">
        <ThanksMessage />
      </div>
    </section>
  );
}
