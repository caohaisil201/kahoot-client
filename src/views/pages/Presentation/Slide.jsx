import React, { useState, useEffect } from 'react';
import { Select, InputNumber, Input, Checkbox } from 'antd';
import { HELPER } from 'utils';

const Slide = ({ slide, handleSaveSlide }) => {
  const questionType = [
    {
      value: 'multiple',
      label: 'Multiple',
    },
    {
      value: 'heading',
      label: 'Heading',
    },
    {
      value: 'paragraph',
      label: 'Paragraph',
    },
  ];

  const [timer, setTimer] = useState(10);
  const [question, setQuestion] = useState('');
  const [point, setPoint] = useState(0);
  const [answerA, setAnswerA] = useState('');
  const [answerB, setAnswerB] = useState('');
  const [answerC, setAnswerC] = useState('');
  const [answerD, setAnswerD] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {
    if (!HELPER.isEmptyObject(slide)) {
      setQuestion(slide.question ? slide.question : '');
      setPoint(slide.point ? slide.point : 0);
      setTimer(slide.timer ? slide.timer : 10);
      setAnswerA(slide.choices ? slide.choices[0].answer : '');
      setAnswerB(slide.choices ? slide.choices[1].answer : '');
      setAnswerC(slide.choices ? slide.choices[2].answer : '');
      setAnswerD(slide.choices ? slide.choices[3].answer : '');
      setCorrectAnswers(
        slide.choices
          ? slide.choices
              .map((choice) => {
                if (choice.isCorrect) return choice.icon;
              })
              .filter((item) => item)
          : []
      );
    }
  }, [slide]);

  const saveSlide = () => {
    const choices = [
      {
        icon: 'A',
        isCorrect: correctAnswers.some((item) => item === 'A'),
        answer: answerA,
      },
      {
        icon: 'B',
        isCorrect: correctAnswers.some((item) => item === 'B'),
        answer: answerB,
      },
      {
        icon: 'C',
        isCorrect: correctAnswers.some((item) => item === 'C'),
        answer: answerC,
      },
      {
        icon: 'D',
        isCorrect: correctAnswers.some((item) => item === 'D'),
        answer: answerD,
      },
    ];
    const newSlide = {
      ...slide,
      question,
      timer,
      choices,
    };
    handleSaveSlide(newSlide);
  };

  if (HELPER.isEmptyObject(slide)) {
    return <></>;
  }

  return (
    <div className="d-flex slide-preview justify-space-between">
      <div className="content d-flex pa-16 flex-column align-center justify-space-between">
        <Input
          style={{ width: '80%' }}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Nh???p c??u h???i"
        />
        <div className="choices d-flex">
          <div className="pa-2" style={{ width: '50%' }}>
            <Input.TextArea
              maxLength={120}
              style={{
                height: 80,
                resize: 'none',
              }}
              placeholder="Nh???p ????p ??n A"
              value={answerA}
              onChange={(e) => setAnswerA(e.target.value)}
            />
          </div>
          <div className="pa-2" style={{ width: '50%' }}>
            <Input.TextArea
              maxLength={120}
              style={{
                height: 80,
                resize: 'none',
              }}
              placeholder="Nh???p ????p ??n B"
              value={answerB}
              onChange={(e) => setAnswerB(e.target.value)}
            />
          </div>
          <div className="pa-2" style={{ width: '50%' }}>
            <Input.TextArea
              maxLength={120}
              style={{
                height: 80,
                resize: 'none',
              }}
              placeholder="Nh???p ????p ??n C"
              value={answerC}
              onChange={(e) => setAnswerC(e.target.value)}
            />
          </div>
          <div className="pa-2" style={{ width: '50%' }}>
            <Input.TextArea
              maxLength={120}
              style={{
                height: 80,
                resize: 'none',
              }}
              placeholder="Nh???p ????p ??n D"
              value={answerD}
              onChange={(e) => setAnswerD(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="options d-flex flex-column justify-space-between">
        <div className="question-type">
          <h2>Question type</h2>
          <Select
            defaultValue="multiple"
            style={{ width: '100%' }}
            options={questionType}
          />
        </div>
        <div className="timer">
          <h2>Time limit (second)</h2>
          <InputNumber
            style={{ width: '100%' }}
            min={10}
            max={60}
            value={timer}
            onChange={(value) => setTimer(value)}
          />
        </div>
        <div className="points">
          <h2>Point</h2>
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            max={10}
            value={point}
            onChange={(value) => setPoint(value)}
          />
        </div>
        <div className="true-answer">
          <h2>Correct answer</h2>
          <Checkbox.Group
            options={[
              { label: 'A', value: 'A' },
              { label: 'B', value: 'B' },
              { label: 'C', value: 'C' },
              { label: 'D', value: 'D' },
            ]}
            value={correctAnswers}
            checked={correctAnswers}
            onChange={(values) => setCorrectAnswers([...values])}
          />
        </div>
        <button className="primary medium" onClick={saveSlide}>
          Th??m slide
        </button>
      </div>
    </div>
  );
};

export default Slide;
