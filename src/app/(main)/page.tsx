
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Award, History } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    icon: BookOpen,
    title: "Interactive Constitution",
    description: "Navigate through articles, schedules, and amendments with ease in a visually rich interface.",
    href: "/explore",
  },
  {
    icon: Award,
    title: "Gamified Quizzes",
    description: "Test your knowledge with engaging quizzes. Earn points and climb the leaderboard!",
    href: "/quizzes",
  },
  {
    icon: History,
    title: "Historical Narratives",
    description: "Travel back in time to understand the debates and events that shaped our constitution.",
    href: "/history",
  }
];

export default function HomePage() {
  return (
    <div className="container mx-auto">
      <section className="relative -mx-4 -mt-4 md:-mx-8 md:-mt-8 h-[60vh] flex items-center justify-center text-center">
        <Image
          src="https://picsum.photos/1600/800"
          alt="Illustration of the Indian Parliament building"
          data-ai-hint="indian parliament"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="relative z-10 p-4 text-foreground text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline animate-fade-in-down">
            Samvidhan Quest
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Embark on an interactive journey to explore, learn, and master the
            Constitution of India.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="animate-bounce-in" style={{animationDelay: '0.4s'}}>
              <Link href="/explore">Explore Constitution</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="animate-bounce-in" style={{animationDelay: '0.6s'}}>
              <Link href="/quizzes">Take a Quiz</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">An Adventure in Learning</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            Samvidhan Quest transforms constitutional education into an engaging and accessible experience for everyone.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={feature.title} className="text-center transform hover:-translate-y-2 transition-transform duration-300 flex flex-col" style={{animation: `fade-in-up 0.5s ${0.8 + 0.2 * index}s ease-out backwards`}}>
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                 <Button variant="link" asChild>
                    <Link href={feature.href}>Learn More</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
