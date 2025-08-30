
"use client";
import { PageHeader } from "@/components/page-header";
import { Award, ArrowRight, CheckCircle, XCircle, RefreshCcw } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { quizzes } from "@/lib/quiz-data";
import React, { useState, useMemo } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig
} from "@/components/ui/chart"
import { Pie, PieChart, Cell } from "recharts";
import { motion, AnimatePresence } from "framer-motion";


type AnsweredQuestion = {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  options: string[];
  isCorrect: boolean;
};

type Quiz = (typeof quizzes)[0];
type Question = Quiz["questions"][0];

const chartConfig = {
  correct: {
    label: "Correct",
    color: "hsl(var(--chart-1))",
  },
  incorrect: {
    label: "Incorrect",
     color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function QuizzesPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);
  const [isReviewing, setIsReviewing] = useState(false);

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setAnsweredQuestions([]);
    setIsReviewing(false);
  };
  
  const handleAnswerSelect = (answer: string) => {
      if(isAnswered) return;
      setSelectedAnswer(answer);
  }

  const handleCheckAnswer = () => {
    if (!selectedAnswer || !selectedQuiz) return;
    
    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    setIsAnswered(true);
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnsweredQuestions([
      ...answeredQuestions,
      {
        question: currentQuestion.question,
        selectedAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        options: currentQuestion.options,
        isCorrect,
      },
    ]);
  }

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex < (selectedQuiz?.questions.length ?? 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };
  
  const handleRestart = () => {
      setSelectedQuiz(null);
  }

  const handleReview = () => {
    setIsReviewing(true);
    setShowResult(false);
    setCurrentQuestionIndex(0);
  };
  
  const handleRetakeQuiz = () => {
    if (selectedQuiz) {
      handleStartQuiz(selectedQuiz);
    }
  };

  const currentQuestion: Question | undefined = selectedQuiz?.questions[currentQuestionIndex];
  const totalQuestions = selectedQuiz?.questions.length ?? 0;
  const progress = selectedQuiz ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;
  
  const chartData = useMemo(() => [
      { name: "correct", value: score, fill: "hsl(var(--chart-1))" },
      { name: "incorrect", value: totalQuestions - score, fill: "hsl(var(--chart-2))" },
  ], [score, totalQuestions]);
  
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  if (isReviewing) {
    return (
      <>
       <div className="container mx-auto">
         <PageHeader title="Review Your Answers" description={`You scored ${score} out of ${totalQuestions}!`} icon={Award}/>
         <div className="mt-8 space-y-4">
            {answeredQuestions.map((q, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">{index + 1}. {q.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                        {q.options.map((option, i) => {
                             const isCorrectAnswer = option === q.correctAnswer;
                             const isSelectedAnswer = option === q.selectedAnswer;
                             return (
                                 <li key={i} className={cn("flex items-center space-x-3 p-3 rounded-md border",
                                   isSelectedAnswer && !isCorrectAnswer && "bg-destructive/20 border-destructive text-destructive-foreground",
                                   isCorrectAnswer && "bg-primary/20 border-primary",
                                 )}>
                                     {isCorrectAnswer ? (
                                        <CheckCircle className="h-5 w-5 text-primary" />
                                     ) : isSelectedAnswer ? (
                                        <XCircle className="h-5 w-5 text-destructive" />
                                     ) : (
                                        <div className="h-5 w-5" />
                                     )}
                                    <Label htmlFor={`option-${i}`} className="flex-1">{option}</Label>
                                 </li>
                             )
                        })}
                        </ul>
                    </CardContent>
                </Card>
            </motion.div>
            ))}
            <div className="text-center mt-8 space-x-4">
              <Button onClick={handleRetakeQuiz}>
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Retake Quiz
              </Button>
              <Button onClick={handleRestart} variant="outline">
                  Choose Another Quiz
              </Button>
            </div>
         </div>
       </div>
      </>
    );
  }

  if (showResult) {
      return (
         <div className="container mx-auto">
             <PageHeader title="Quiz Results" description={`You scored ${score} out of ${totalQuestions}!`} icon={Award}/>
             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
             >
             <Card className="mt-8 text-center">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Congratulations!</CardTitle>
                    <CardDescription>You have successfully completed the {selectedQuiz?.title} quiz.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6 flex flex-col items-center">
                    <ChartContainer config={chartConfig} className="w-full h-64">
                        <PieChart accessibilityLayer>
                          <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={90} cornerRadius={5} startAngle={90} endAngle={450}>
                            {chartData.map((entry) => (
                                <Cell key={entry.name} fill={entry.fill} />
                            ))}
                          </Pie>
                           <ChartTooltip
                              cursor={false}
                              content={<ChartTooltipContent hideLabel />}
                            />
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="fill-foreground text-4xl font-bold font-headline"
                            >
                                {percentage}%
                            </text>
                        </PieChart>
                    </ChartContainer>
                     <div className="flex gap-4">
                        <Button onClick={handleReview}>Review Answers</Button>
                        <Button onClick={handleRetakeQuiz}>
                          <RefreshCcw className="mr-2 h-4 w-4" />
                          Retake Quiz
                        </Button>
                        <Button onClick={handleRestart} variant="outline">Take Another Quiz</Button>
                     </div>
                </CardContent>
             </Card>
             </motion.div>
         </div>
      )
  }

  if (selectedQuiz && currentQuestion) {
    return (
      <div className="container mx-auto">
        <PageHeader title={selectedQuiz.title} description="Answer the questions below." icon={Award} />
         <AnimatePresence mode="wait">
         <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
         >
         <Card className="mt-8">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="font-headline text-xl lg:text-2xl">{currentQuestion.question}</CardTitle>
                    <div className="text-sm text-muted-foreground whitespace-nowrap">
                        {currentQuestionIndex + 1} / {totalQuestions}
                    </div>
                </div>
                <CardDescription>Select the correct answer below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <RadioGroup onValueChange={handleAnswerSelect} value={selectedAnswer || ""}>
                    {currentQuestion.options.map((option, index) => {
                        const isCorrect = option === currentQuestion.correctAnswer;
                        const isSelected = option === selectedAnswer;
                        return (
                         <div key={index} className={cn("flex items-center space-x-3 p-3 rounded-md border transition-all duration-300",
                            isAnswered && isSelected && !isCorrect && "bg-destructive/20 border-destructive scale-105",
                            isAnswered && isCorrect && "bg-primary/20 border-primary scale-105",
                            !isAnswered && "hover:bg-muted/50 cursor-pointer"
                         )}>
                            <RadioGroupItem value={option} id={`option-${index}`} disabled={isAnswered} />
                            <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1">{option}</Label>
                            {isAnswered && isCorrect && <CheckCircle className="h-5 w-5 text-primary" />}
                            {isAnswered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-destructive" />}
                        </div>
                    )})}
                </RadioGroup>
                 <div className="mt-4 pt-4 space-y-2">
                  <Progress value={progress} className="h-2" />
                  <p className="text-right text-sm text-muted-foreground">{Math.round(progress)}% complete</p>
                </div>
            </CardContent>
            <CardFooter>
                {isAnswered ? (
                    <Button onClick={handleNextQuestion} className="w-full md:w-auto ml-auto">
                        {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <Button onClick={handleCheckAnswer} disabled={!selectedAnswer} className="w-full md:w-auto ml-auto">
                        Check Answer
                    </Button>
                )}
            </CardFooter>
         </Card>
         </motion.div>
         </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Gamified Quizzes"
        description="Put your constitutional knowledge to the test and earn rewards!"
        icon={Award}
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz, index) => (
          <motion.div
            key={quiz.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
          <Card className="flex flex-col transform hover:-translate-y-2 transition-transform duration-300 h-full">
            <CardHeader>
              <CardTitle className="font-headline">{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow"></CardContent>
            <CardFooter className="mt-auto flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{quiz.questions.length} Questions</span>
              <Button onClick={() => handleStartQuiz(quiz)}>
                Start Quiz <ArrowRight />
              </Button>
            </CardFooter>
          </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
