import React from 'react'

import QuestionDisplayComments from './QuestionDisplayComments.js'

import questionFunctions from '../utility/questionFunctions'

import './QuestionDisplay.css'
import './QuestionAnswered.css'

var shuffle = require('shuffle-array')

export default class QuestionDisplay extends React.Component{

	state = {
		comments: [],
		showCommentButton: false,
		showCommentText:false,
		showAllComments:false,
		showAnsweredButton: false,
		enableCommentButton: false,
	}

	componentDidMount(){

		// this.onPageLoadFunctions()
	}

	displayAnsweredCorrect = () => {
		this.commentButtonTimeout = setTimeout(() => { this.setState({ showCommentButton: true })}, 3000)

		this.enableCommentButtonTimeout = setTimeout(() => { this.setState({ enableCommentButton: true })}, 3750)
		this.enableAnsweredButtonTimeout = setTimeout(() => { this.setState({ enableAnsweredButton: true })}, 4250)
	}

	displayAnsweredIncorrect = () => {
		this.commentButtonTimeout = setTimeout(() => { this.setState({ showCommentButton: true })}, 3000)
		this.answeredButtonsTimeout = setTimeout(() => { this.setState({ showAnsweredButton: true })}, 3500)

		this.enableCommentButtonTimeout = setTimeout(() => { this.setState({ enableCommentButton: true })}, 3750)
		this.enableAnsweredButtonTimeout = setTimeout(() => { this.setState({ enableAnsweredButton: true })}, 4250)
	}

	displayAnsweredOuttaTime = () => {
		this.answeredHeaderTimeout = setTimeout(() => { this.setState({ showAnsweredHeader: true })}, 1000)
		this.difficultyTimeout = setTimeout(() => { this.setState({ showDifficulty: true })}, 2000)
		this.voteButtonsTimeout = setTimeout(() => { this.setState({ showVoteButtons: true })}, 2500)
		this.commentButtonTimeout = setTimeout(() => { this.setState({ showCommentButton: true })}, 3000)
		this.answeredButtonsTimeout = setTimeout(() => { this.setState({ showAnsweredButton: true })}, 3500)

		this.enableCommentButtonTimeout = setTimeout(() => { this.setState({ enableCommentButton: true })}, 3750)
		this.enableAnsweredButtonTimeout = setTimeout(() => { this.setState({ enableAnsweredButton: true })}, 4250)
	}

	outtaTime = () => {

		let answerObj = {
			user_id: this.props.user_id,
			question_id: this.props.question.id,
			user_answer: 'No Answer',
			user_result: 'No Answer',
			user_time: "0.0"
		}

		questionFunctions('post', 'http://localhost:3001/answers', answerObj)
		.then(() => {
			this.setState({
				user_answer: 'No Answer',
				user_result: 'Outta Time!',
				display: 'answered',
				time: "-1"
			})
		})
		this.displayAnsweredOuttaTime()
	}

	randomizeAnswerOrder = (question) => {
		const question_answers = [
			question.correct_answer,
			question.incorrect_answers[0],
			question.incorrect_answers[1],
			question.incorrect_answers[2]
		]

		const shuffled_answers = shuffle(question_answers)

		this.setState({ answers: shuffled_answers })
	}

	getComments = () => {
		questionFunctions('get', `http://localhost:3001/questions/${this.props.question.id}`)
		.then(res_obj =>
			this.setState({ comments: res_obj.data.attributes.comments.map(comment => comment) })
		)
	}

	onClickCommentFunctions = (event) => {
		event.persist()
		this.onClickTrafficFunctions(event)
		this.setState({
			showCommentButton: false,
			showCommentText: true,
		})
	}

	onChangeComment = (event) => {
		this.setState({ [event.target.name]: event.target.value })
	}

	onSubmitCommentFunctions = (event) => {
		this.addCommentSubmitted(event)
		this.onClickTrafficFunctions(event)
	}

	addCommentSubmitted = (event) => {
		event.persist()
		event.preventDefault()

		let commentObj = {
			user_id: this.props.user_id,
			user_name: this.props.user_name,
			question_id: this.props.question.id,
			comment_text: this.state.comment_text
		}

		if (this.state.comment_text){
			questionFunctions('post', 'http://localhost:3001/comments', commentObj)
			.then(res_obj => {
				if (res_obj.errors) {
					this.setState({
						errors: res_obj.errors
					})
				} else {
					this.setState({
						showCommentText:false,
						showAllComments:true,
					})
					this.getComments()
				}
			})
		} else {
			alert("Please Enter A Comment")
		}
	}

	onClickNextQuestionFunctions = (event) => {
		this.props.nextQuestion(this.props.user_id)
		this.onClickTrafficFunctions(event)

		this.setState({ display: 'question' })
	}

	componentWillUnmount(){
		clearTimeout(this.commentButtonTimeout)
		clearTimeout(this.showAnsweredButtons)
	}

	render(){

		const blank = <></>

		const loading =
			<div className="loading_container">
				<div className="loading_animation_container">
					<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
				</div>
			</div>

		const answered_header = <h3> { this.state.time === 0 ? this.outtaTime() : this.state.user_result } </h3>

		const comment_button =
			<button
				key={"comment_button"}
				name="comment_button"
				value="comment_button"
				interaction="click"
				className={ this.state.enableCommentButton ? "question_card_comment_button" : "question_card_comment_button_disabled" }
				onClick={ this.state.enableCommentButton ? this.onClickCommentFunctions : this.onClickBlankFunctions }
			>
				Leave a Comment
			</button>

		const comment_form =
			<form
				name="add_comment_form"
				interaction="submit"
				className="question_card_comment_form"
				onSubmit={ this.onSubmitCommentFunctions }
			>
				<textarea
					rows="5"
					id="add_comment"
					name="comment_text"
					placeholder="Add A Comment..."
					onChange={ this.onChangeComment }
					value={ this.state.comment_text }
				/>
				<div className="comment_button_container">
					<input
						type="submit"
						className="question_card_comment_button"
						value="Add Comment"
					/>
				</div>
			</form>

		const all_comments = this.state.comments.map(comment =>
			<QuestionDisplayComments
				key={comment.id}
				comment={comment}
			/>
		)

		const next_question_button =
			<button
				key={"next_question_button"}
				name="next_question_button"
				interaction="click"
				className={ this.state.enableAnsweredButton ? "question_card_next_question_button" : "question_card_next_question_button_disabled" }
				onClick={ this.state.enableAnsweredButton ? this.onClickNextQuestionFunctions : this.onClickBlankFunctions }
			>
				Next Question
			</button>

		const DisplayAnswer =
			<div className="question_card">

				<div className={ this.state.showCommentButton || this.state.showCommentText || this.state.showAllComments ? "question_card_comment": "blank"}>
					<div className={ this.state.showCommentButton ? "question_card_comment_button_container": "blank"}>
						{ this.state.showCommentButton ? comment_button : blank }
					</div>
					<div className={ this.state.showCommentText ? "question_card_comment_text": "blank"}>
						{ this.state.showCommentText ? comment_form : blank }
					</div>
					<div className={ this.state.showAllComments ? "question_card_all_comments": "blank"}>
						{ this.state.showAllComments ? all_comments : blank }
					</div>
				</div>

				<div className={ this.state.showAnsweredButton ? "question_card_next_question_button_container": "blank"}>
					{ this.state.showAnsweredButton ? next_question_button : blank }
				</div>
			</div>

		return(
			<>
				{
					(() => {
						switch(this.state.display) {
							case 'question': return displayQuestion;
							case 'answered': return DisplayAnswer;
							default: return blank;
						}
					})()
				}
			</>
		)
	}
}
