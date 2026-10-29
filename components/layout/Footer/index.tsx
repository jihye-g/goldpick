import { cacheLife } from "next/cache";

export async function Footer() {
  "use cache";
  cacheLife("days");

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-screen-lg px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} 골드픽. All rights reserved.</p>
      </div>
    </footer>
  );
}
