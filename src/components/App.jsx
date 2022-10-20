import { useState, useEffect } from 'react';

import { Box } from './Box';
import { Section } from 'components/Section';
import { FeedbackOptions } from 'components/FeedbackOptions';
import { Statistics } from 'components/Statistics';
import { Notification } from 'components/Notification';

const btnsName = ['good', 'neutral', 'bad'];

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [positivePercentage, setPositivePercentage] = useState(0);

  const addMark = button => {
    switch (button) {
      case 'good':
        setGood(pS => pS + 1);
        break;
      case 'neutral':
        setNeutral(pS => pS + 1);
        break;
      case 'bad':
        setBad(pS => pS + 1);
        break;
      default: {
        return;
      }
    }
  };

  useEffect(() => {
    if (good || bad || neutral) {
      setTotal(pS => pS + 1);
    }
  }, [bad, good, neutral]);

  useEffect(() => {
    const percentage = (good / total) * 100;
    const PercentageInt = Number.parseInt(percentage);
    setPositivePercentage(good ? PercentageInt + '%' : '0%');
  }, [good, total]);
  return (
    <Box as="main" color="accent" pt={7} pb={7} textAlign="center">
      <Section title={'Please leave feedback'}>
        <FeedbackOptions options={btnsName} onLeaveFeedback={addMark} />
      </Section>
      <>
        {total > 0 ? (
          <Section title={'Statistics'}>
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={positivePercentage}
            />
          </Section>
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </>
    </Box>
  );
};
