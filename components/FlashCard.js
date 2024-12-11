import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useSpring, animated } from 'react-spring';

const FlashCard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <Card
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      sx={{
        // width: 300,
        minHeight: 200,
        cursor: 'pointer',
        position: 'relative',
        borderRadius: '1rem',
        border: '2px solid #323232',
        boxShadow: '4px 4px #323232', // Shadow matching your theme
        backgroundColor: '#fff', // Card background color,
    
      }}
    >
      <animated.div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: opacity.to(o => 1 - o),
          transform,
          borderRadius: '1rem',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: '#323232', // Text color matching the theme
            }}
          >
            {question}
          </Typography>
        </CardContent>
      </animated.div>
      <animated.div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity,
          transform: transform.to(t => `${t} rotateX(180deg)`),
          borderRadius: '1rem',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: '600',
              color: '#323232', // Text color for answer, consistent with theme
            }}
          >
            {answer}
          </Typography>
        </CardContent>
      </animated.div>
    </Card>
  );
};

export default FlashCard;
