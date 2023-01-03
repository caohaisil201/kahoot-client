import React, { useState, useEffect } from 'react';
import { Select, InputNumber, Input, Checkbox } from 'antd';
import { HELPER } from 'utils';

const Slide = ({ slide, handleSaveSlide }) => {
  const questionTypeLabel = [
    {
      value: 1,
      label: 'Question',
    },
    {
      value: 2,
      label: 'Paragraph',
    },
    {
      value: 3,
      label: 'Heading',
    },
  ];
  const [questionType , setQuestionType] = useState(1);
  const [timer, setTimer] = useState(10);
  const [heading, setHeading] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [point, setPoint] = useState(0);
  const [answerA, setAnswerA] = useState('');
  const [answerB, setAnswerB] = useState('');
  const [answerC, setAnswerC] = useState('');
  const [answerD, setAnswerD] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const changeQuestionType = (value) => {
    setQuestionType(value);
  }

  useEffect(() => {
    if (!HELPER.isEmptyObject(slide)) {
      setHeading(slide.heading ? slide.heading : '');
      setParagraph(slide.paragraph ? slide.paragraph :'');
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
      heading,
      paragraph,
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
      <div className="content d-flex pa-8 flex-column align-center justify-space-between">
        <Input
          style={{ width: '80%' }}
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder="Nhập heading"
        />
        {questionType === 1 || questionType === 2 ? <div className="paragraph d-flex">
          <Input.TextArea
            style={{
              height: 100,
              width: 520,
              resize: 'none',
            }}
            placeholder="Nhập paragraph"
            value={paragraph}
            onChange={e => setParagraph(e.target.value)}
          />
        </div> : <></>}
        {questionType === 1 ? <div className="choices d-flex">
          <div className="pa-2" style={{ width: '50%' }}>
            <Input.TextArea
              maxLength={120}
              style={{
                height: 80,
                resize: 'none',
              }}
              placeholder="Nhập đáp án A"
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
              placeholder="Nhập đáp án B"
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
              placeholder="Nhập đáp án C"
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
              placeholder="Nhập đáp án D"
              value={answerD}
              onChange={(e) => setAnswerD(e.target.value)}
            />
          </div>
        </div> : <></>}
      </div>
      <div className="options d-flex flex-column justify-space-between">
        <div className="question-type">
          <h2>Question type</h2>
          <Select
            defaultValue="Question"
            style={{ width: '100%' }}
            options={questionTypeLabel}
            onChange={changeQuestionType}
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
          Thêm slide
        </button>
      </div>
    </div>
  );
};

export default Slide;
