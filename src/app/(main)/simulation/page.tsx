import { PageHeader } from "@/components/page-header";
import { Users, Hammer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SimulationPage() {
  return (
    <div className="container mx-auto text-center">
      <PageHeader
        title="Constituent Assembly Simulation"
        description="An interactive module where you can role-play as a member of the Constituent Assembly."
        icon={Users}
        className="text-center justify-center items-center"
      />
      <Card className="mt-8 max-w-2xl mx-auto">
        <CardContent className="p-8 space-y-4">
            <Hammer className="mx-auto h-16 w-16 text-primary" />
            <h3 className="text-2xl font-bold font-headline">Feature Coming Soon!</h3>
            <p className="text-muted-foreground">
                We are hard at work building this immersive experience. Soon, you'll be able to step into the shoes of history-makers, debate key provisions, and shape the Constitution yourself. Stay tuned!
            </p>
            <Button disabled>Start Simulation</Button>
        </CardContent>
      </Card>
    </div>
  );
}
