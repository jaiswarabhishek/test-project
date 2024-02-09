"use client"

import { cn } from "@/utils"
import { motion, stagger, useAnimate, useInView } from "framer-motion"
import { useEffect } from "react"

export const TypewriterEffect = ({
    words,
    className,
    cursorClassName,
}: {
    words: {
        text: string
        className?: string
    }[]
    className?: string
    cursorClassName?: string
}) => {
    // split text inside of words into array of characters
    const wordsArray = words.map(word => {
        return {
            ...word,
            text: word.text.split(""),
        }
    })

    const [scope, animate] = useAnimate()
    const isInView = useInView(scope)
    useEffect(() => {
        if (isInView) {
            animate(
                "span",
                {
                    display: "inline-block",
                    opacity: 1,
                },
                {
                    duration: 0.3,
                    delay: stagger(0.1),
                    ease: "easeInOut",
                }
            )
        }
    }, [isInView])

    const renderWords = () => {
        return (
            <motion.div ref={scope} className="inline">
                {wordsArray.map((word, idx) => {
                    return (
                        <div key={`word-${idx}`} className="inline-block">
                            {word.text.map((char, index) => (
                                <motion.span initial={{}} key={`char-${index}`} className={cn(`dark:text-white text-gray-700 opacity-0 hidden`, word.className)}>
                                    {char}
                                </motion.span>
                            ))}
                            &nbsp;
                        </div>
                    )
                })}
            </motion.div>
        )
    }
    return (
        <div className={cn("text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-center", className)}>
            {renderWords()}
            <motion.span
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className={cn("inline-block rounded-sm h-8 w-[4px] md:h-8 lg:h-8 bg-[#0E7490]", cursorClassName)}
            ></motion.span>
        </div>
    )
}

export const TypewriterEffectSmooth = ({
    words,
    className,
    cursorClassName,
}: {
    words: {
        text: string
        className?: string
    }[]
    className?: string
    cursorClassName?: string
}) => {
    // split text inside of words into array of characters
    const wordsArray = words.map(word => {
        return {
            ...word,
            text: word.text.split(""),
        }
    })
    const renderWords = () => {
        return (
            <div>
                {wordsArray.map((word, idx) => {
                    return (
                        <div key={`word-${idx}`} className="inline-block">
                            {word.text.map((char, index) => (
                                <span key={`char-${index}`} className={cn(`dark:text-white text-gray-700 `, word.className)}>
                                    {char}
                                </span>
                            ))}
                            &nbsp;
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className={cn("flex space-x-1 items-center my-6", className)}>
            <motion.div
                className="overflow-hidden "
                initial={{
                    width: "0%",
                }}
                viewport={{ once: true, amount: 0.5 }}
                whileInView={{
                    width: "fit-content",
                }}
                transition={{
                    duration: 2,
                    ease: "linear",
                    delay: 1,
                }}
            >
                <div
                    className="text-lg sm:text-xl md:text-xl lg:text:xl xl:text-2xl font-bold"
                    style={{
                        whiteSpace: "nowrap",
                    }}
                >
                    {renderWords()}
                </div>
            </motion.div>
            <motion.span
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.8,

                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className={cn("block rounded-sm  h-8 w-[4px] sm:h-8 xl:h-8 bg-[#0E7490]", cursorClassName)}
            ></motion.span>
        </div>
    )
}
