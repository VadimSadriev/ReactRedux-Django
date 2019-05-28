import React from 'react'
import axios from 'axios'
import { Card, Button } from 'antd';
import CustomForm from '../components/form';

class ArticleDetail extends React.Component {

    state = {
        article: {}
    }

    componentDidMount() {
        const articleId = this.props.match.params.articleId;

        axios.get(`http://127.0.0.1:8000/api/${articleId}`)
            .then(res => {
                this.setState({
                    article: res.data
                });
            }, res => {
                console.log(res);
            })
    }

    handleDelete = (event) => {
        const articleId = this.props.match.params.articleId;

        axios.delete(`http://127.0.0.1:8000/api/${articleId}`)
            .then(res => {
                this.setState({
                    article: res.data
                });
            }, res => {
                console.log(res);
            })
    }

    render() {
        return (
            <div>
                <Card title={this.state.article.title}>
                    <p>{this.state.article.content}</p>
                </Card>
                <CustomForm requestType="put" articleId={this.props.match.params.articleId} btnText="Update"/>
                <form onSubmit={this.handleDelete}>
                    <Button type="danger" htmlType="delete">Delete</Button>
                </form>
            </div>
        )
    }
}

export default ArticleDetail;