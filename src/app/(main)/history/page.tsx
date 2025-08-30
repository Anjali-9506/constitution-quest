
"use client";

import { PageHeader } from "@/components/page-header";
import { History, Milestone } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const historicalEvents = [
  {
    year: "1946",
    title: "The Constituent Assembly First Meets",
    description: "The Constituent Assembly of India, tasked with drafting the constitution, holds its first session on December 9, 1946.",
    image: "https://picsum.photos/600/400?random=1",
    aiHint: "historical assembly"
  },
  {
    year: "1947",
    title: "Drafting Committee Appointed",
    description: "On August 29, 1947, the Drafting Committee is appointed with Dr. B.R. Ambedkar as its chairman to prepare a draft Constitution for India.",
    image: "https://picsum.photos/600/400?random=2",
    aiHint: "vintage portrait"
  },
  {
    year: "1949",
    title: "Adoption of the Constitution",
    description: "The Constitution of India is formally adopted by the Constituent Assembly on November 26, 1949. This day is now celebrated as Constitution Day.",
    image: "https://picsum.photos/600/400?random=3",
    aiHint: "old document"
  },
  {
    year: "1950",
    title: "The Constitution Comes into Force",
    description: "The Constitution of India comes into full effect on January 26, 1950, marking the birth of the Republic of India.",
    image: "https://picsum.photos/600/400?random=4",
    aiHint: "celebration parade"
  },
  {
    year: "1951",
    title: "The First Amendment",
    description: "The First Amendment Act, 1951, is passed, making several changes to Fundamental Rights to address challenges in governance and land reform.",
    image: "https://picsum.photos/600/400?random=5",
    aiHint: "protest march"
  },
  {
    year: "1973",
    title: "Kesavananda Bharati Case",
    description: "The Supreme Court delivers a landmark judgment in the Kesavananda Bharati case, establishing the 'Basic Structure Doctrine' of the Constitution.",
    image: "https://picsum.photos/600/400?random=6",
    aiHint: "court gavel"
  },
  {
    year: "1976",
    title: "The 42nd (Mini-Constitution) Amendment",
    description: "One of the most extensive and controversial amendments is passed during the Emergency, altering large parts of the Constitution.",
    image: "https://picsum.photos/600/400?random=7",
    aiHint: "political gathering"
  }
];

export default function HistoryPage() {
  return (
    <div className="container mx-auto">
      <PageHeader
        title="Historical Timeline"
        description="Journey through the key milestones that shaped the Constitution of India."
        icon={History}
      />
      <div className="mt-12 relative">
        {/* The vertical line */}
        <div className="absolute left-1/2 -ml-px w-0.5 h-full bg-border" aria-hidden="true"></div>

        <div className="space-y-16">
          {historicalEvents.map((event, index) => (
             <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center">
                 <div className={`w-full flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}>
                    <div className="w-1/2 p-4">
                        <Card className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                           <div className="relative h-64">
                             <Image src={event.image} alt={event.title} data-ai-hint={event.aiHint} fill className="object-cover" />
                           </div>
                        </Card>
                    </div>
                    <div className="w-1/2 p-8">
                       <div className={`text-3xl font-bold font-headline mb-2 text-primary ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>{event.year}</div>
                       <h3 className={`text-2xl font-bold ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>{event.title}</h3>
                       <p className={`mt-2 text-muted-foreground ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>{event.description}</p>
                    </div>
                 </div>
                 <div className="absolute left-1/2 -ml-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center ring-8 ring-background">
                    <Milestone className="h-5 w-5 text-primary-foreground" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
