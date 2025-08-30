import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type PageHeaderProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
};

export function PageHeader({ title, description, icon: Icon, className }: PageHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-4">
        {Icon && <Icon className="h-10 w-10 text-primary" />}
        <h1 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl font-headline">
          {title}
        </h1>
      </div>
      {description && <p className="text-lg text-muted-foreground">{description}</p>}
    </div>
  );
}
