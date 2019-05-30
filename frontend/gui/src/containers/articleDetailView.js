import React from 'react'
import axios from 'axios'
import { Card, Button } from 'antd';
import CustomForm from '../components/form';
import { connect } from 'react-redux';

class ArticleDetail extends React.Component {

    state = {
        article: {}
    }

    componentWillReceiveProps(newProps) {

        if (newProps.token) {
            axios.defaults.headers = {
                'Content-Type': 'application/json',
                Autherization: newProps.token
            }
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

    }

    handleDelete = (event) => {

        if (this.props.token) {
            axios.defaults.headers = {
                'Content-Type': 'application/json',
                Autherization: this.props.token
            }
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
        else {
            //show error
        }
    }

    render() {
        return (
            <div>
                <Card title={this.state.article.title}>
                    <p>{this.state.article.content}</p>
                </Card>
                <CustomForm requestType="put" articleId={this.props.match.params.articleId} btnText="Update" />
                <form onSubmit={this.handleDelete}>
                    <Button type="danger" htmlType="submit">Delete</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(ArticleDetail);