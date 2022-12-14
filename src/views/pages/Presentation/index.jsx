import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import Loading from 'views/components/Loading';
import {
	getPresentationByCodeAPI,
	getSlidesFromPresentCodeAPI,
} from 'api/PresentationAPI';
import { DeleteOutlined } from '@ant-design/icons';
import './style.scss';
import { Checkbox, Tooltip } from 'antd';

//Presentation Edit
const Presentation = () => {
	const accessToken = sessionStorage.getItem('access_token');
	const { code } = useParams();
	const [title, setTitle] = useState('');
	const [slides, setSlides] = useState([]);
	const [question, setQuestion] = useState('');
	const slidesQuery = useQuery({
		queryKey: ['getSlide'],
		queryFn: async () => await getSlidesFromPresentCodeAPI(accessToken, code),
	});
	const presentQuery = useQuery({
		queryKey: ['getPresent'],
		queryFn: async () => await getPresentationByCodeAPI(accessToken, code),
	});
	const data = slidesQuery.data;

	useEffect(() => {
		if (presentQuery.data) {
			setTitle(presentQuery.data.name);
		}
	}, [presentQuery.isSuccess]);

	useEffect(() => {
		if (slidesQuery.data) {
			setSlides([...slidesQuery.data]);
		}
	}, [slidesQuery.isSuccess]);

	if (slidesQuery.isLoading && presentQuery.isLoading) {
		return <Loading />;
	}

	if (slidesQuery.isError && presentQuery.isError) {
		return <div>Error</div>;
	}
	const handleSubmit = () => {

	}
	const openCreateSlide = () => {

	}
	const selectSlide = (slide) => {
		console.log('slide', slide);
	};

	return (
		<div className="presentation-detail container pt-6 d-flex flex-column">
			<div className="header d-flex justify-end">
				<input value={title} onChange={(e) => setTitle(e.target.value)} />
				<button className="primary small">Tạo slide</button>
				<button
					className="primary small"
					style={{ marginLeft: '12px' }}
					onClick={handleSubmit}>
					Lưu
				</button>
			</div>
			<div className="body mt-4 d-flex">
				<div className="slide-list d-flex">
					{slides.map((slide, index) => {
						return (
							<div
								className="item pa-2"
								key={index}
							>
								<div className="d-flex align-center justify-center " onClick={() => selectSlide(slide)}>{index + 1}</div>
								<button className="icon">
									<Tooltip title="Xóa" color="#ff0000">
										<DeleteOutlined style={{ color: "#ff0000" }} />
									</Tooltip>
								</button>
							</div>
						);
					})}
				</div>

				{/* <div className="question-creator d-flex flex-column align-center">
					<input
						type="text"
						name="question"
						placeholder="Nhập câu hỏi"
						onChange={(e) => setQuestion(e.target.value)}
						value={data.question}
					/>
					<Checkbox.Group className="answer-list d-flex">
						<Checkbox value="A" />
						{data.choices.map((choice) => {
							return (


								<div className="answer-choice pa-2" key={choice.icon}>
									<Checkbox
										className="d-flex align-center justify-center"
										value={choice.icon}
									>
										{choice.icon}. {choice.answer}
									</Checkbox>
								</div>
							);
						})}
					</Checkbox.Group>
				</div> */}
			</div>

		</div>
	);
};

export default Presentation;
