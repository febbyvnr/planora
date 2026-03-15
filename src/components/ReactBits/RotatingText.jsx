    'use client';

    import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
    import { motion, AnimatePresence } from 'motion/react';

    function cn(...classes) {
    return classes.filter(Boolean).join(' ');
    }

    const RotatingText = forwardRef((props, ref) => {
    const {
        texts,
        transition = { type: 'spring', damping: 25, stiffness: 300 },
        initial = { y: '100%', opacity: 0 },
        animate = { y: 0, opacity: 1 },
        exit = { y: '-120%', opacity: 0 },
        animatePresenceMode = 'wait',
        animatePresenceInitial = false,
        rotationInterval = 2000,
        staggerDuration = 0,
        staggerFrom = 'first',
        loop = true,
        auto = true,
        splitBy = 'characters',
        onNext,
        mainClassName,
        splitLevelClassName,
        elementLevelClassName,
        ...rest
    } = props;

    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    const splitIntoCharacters = text => {
        if (typeof Intl !== 'undefined' && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
        return Array.from(segmenter.segment(text), segment => segment.segment);
        }
        return Array.from(text);
    };

    const elements = useMemo(() => {
        const currentText = texts[currentTextIndex];
        const words = currentText.split(' ');
        return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1
        }));
    }, [texts, currentTextIndex]);

    const getStaggerDelay = useCallback(
        (index, totalChars) => {
        if (staggerFrom === 'first') return index * staggerDuration;
        if (staggerFrom === 'last') return (totalChars - 1 - index) * staggerDuration;
        return index * staggerDuration;
        },
        [staggerFrom, staggerDuration]
    );

    const next = useCallback(() => {
        setCurrentTextIndex(prev =>
        prev === texts.length - 1 ? (loop ? 0 : prev) : prev + 1
        );
    }, [texts.length, loop]);

    useImperativeHandle(ref, () => ({
        next
    }));

    useEffect(() => {
        if (!auto) return;
        const interval = setInterval(next, rotationInterval);
        return () => clearInterval(interval);
    }, [next, rotationInterval, auto]);

    return (
        <motion.span
        className={cn(
            'inline-flex items-center w-fit whitespace-pre-wrap relative',
            mainClassName
        )}
        layout
        transition={transition}
        {...rest}
        >
        <span className="sr-only">{texts[currentTextIndex]}</span>

        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
            <motion.span
            key={currentTextIndex}
            className="inline-flex whitespace-pre-wrap"
            layout
            aria-hidden="true"
            >
            {elements.map((wordObj, wordIndex, array) => {
                const previousCharsCount = array
                .slice(0, wordIndex)
                .reduce((sum, word) => sum + word.characters.length, 0);

                return (
                <span key={wordIndex} className={cn('inline-flex', splitLevelClassName)}>
                    {wordObj.characters.map((char, charIndex) => (
                    <motion.span
                        key={charIndex}
                        initial={initial}
                        animate={animate}
                        exit={exit}
                        transition={{
                        ...transition,
                        delay: getStaggerDelay(
                            previousCharsCount + charIndex,
                            array.reduce((sum, word) => sum + word.characters.length, 0)
                        )
                        }}
                        className={cn('inline-block', elementLevelClassName)}
                    >
                        {char}
                    </motion.span>
                    ))}
                    {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
                </span>
                );
            })}
            </motion.span>
        </AnimatePresence>
        </motion.span>
    );
    });

    RotatingText.displayName = 'RotatingText';

    export default RotatingText;