"use client";

import { PageHeader } from "@/components/page-header";
import { BookOpen, Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { constitution } from "@/lib/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";

export default function ExploreClient() {
  const searchParams = useSearchParams();
  const articleId = searchParams.get("article") || "1";
  const [searchTerm, setSearchTerm] = useState("");
  // FIX 1: Changed 'aState' to the correct 'useState'
  const [activeKey, setActiveKey] = useState(0);

  const filteredConstitution = useMemo(() => {
    if (!searchTerm) return constitution;
    return constitution
      .map(part => ({
        ...part,
        articles: part.articles.filter(
          article =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            `Article ${article.id}`.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter(part => part.articles.length > 0);
  }, [searchTerm]);

  const displayedArticle = useMemo(() => {
    for (const part of constitution) {
      const foundArticle = part.articles.find(a => a.id === articleId);
      if (foundArticle) {
        return { ...foundArticle, part: part.part };
      }
    }
    // Default fallback if no article is found
    return { ...constitution[0].articles[0], part: constitution[0].part };
  }, [articleId]);

  useEffect(() => {
    // This forces a re-render for the animation when the articleId changes
    // FIX 2: Added the type 'number' to the 'prev' parameter
    setActiveKey((prev: number) => prev + 1);
  }, [articleId]);

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Constitution Explorer"
        description="Browse and search through the articles and parts of the Indian Constitution."
        icon={BookOpen}
      />
      <div className="mt-8 grid gap-8 md:grid-cols-3 lg:grid-cols-4">
        <div className="md:col-span-1 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Table of Contents</CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <AnimatePresence>
                  <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                    {filteredConstitution.map((part, index) => (
                      <motion.div
                        key={part.part}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <AccordionItem value={`item-${index}`} key={index}>
                          <AccordionTrigger>{part.part}</AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2 pl-4">
                              {part.articles.map((article) => (
                                <li key={article.id}>
                                  <Link
                                    href={`/explore?article=${article.id}`}
                                    className={`text-muted-foreground hover:text-primary transition-colors ${articleId === article.id ? "text-primary font-bold" : ""}`}
                                  >
                                    Article {article.id}: {article.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    ))}
                  </Accordion>
                </AnimatePresence>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <Card className="sticky top-20 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CardHeader>
                    <div>
                      <CardTitle className="font-headline text-2xl">
                        Article {displayedArticle.id}: {displayedArticle.title}
                      </CardTitle>
                      <CardDescription>
                        From: {displayedArticle.part}
                      </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-lg max-w-none text-foreground dark:prose-invert">
                    <p>{displayedArticle.content}</p>
                  </div>
                </CardContent>
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </div>
  );
}