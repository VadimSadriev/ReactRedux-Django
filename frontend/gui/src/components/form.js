import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import {connect} from 'react-redux';

class CustomForm extends React.Component {

    handleFormSubmit = (event, requestType, articleId) => {
        event.preventDefault();
        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value;

        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Autherization: this.props.token
        }

        switch (requestType) {
            case 'post': {
                axios.post('http://127.0.0.1:8000/api/create/', {
                    title: title,
                    content: content
                }).then((res) => {
                    console.log(res);
                }, res => {
                    console.log(res);
                });

                break;
            }
            case 'put': {
                axios.put(`http://127.0.0.1:8000/api/${articleId}/update/`, {
                    title: title,
                    content: content
                }).then((res) => {
                    console.log(res);
                }, res => {
                    console.log(res);
                });
                break;
            }
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={(event) => {
                    this.handleFormSubmit(
                        event,
                        this.props.requestType,
                        this.props.articleId)
                }}>
                    <Form.Item label="Title">
                        <Input name="title" placeholder="Put a title here" />
                    </Form.Item>
                    <Form.Item label="Content">
                        <Input name="content" placeholder="Put a content here" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}


export default connect(mapStateToProps)(CustomForm);