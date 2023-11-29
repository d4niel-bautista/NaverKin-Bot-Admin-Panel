import React, { useContext, useEffect, useState } from 'react';
import Logins from './Logins';
import { AuthContext } from '../../context/AuthProvider';
import { ServerAPIContext } from '../../context/ServerAPIProvider';
import AnswerResponses from './AnswerResponses';
import { Box, Grid } from '@mui/material';
import QuestionPosts from './QuestionPosts';

const ActivityLog = () => {
    const [token] = useContext(AuthContext);
    const [serverAPI] = useContext(ServerAPIContext);
    const [answerResponses, setAnswerResponses] = useState([]);
    const [questionPosts, setQuestionPosts] = useState([]);
    const [logins, setLogins] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            const response = await fetch(serverAPI + "/activities", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                }
            });

            if (response.ok) {
                const data = await response.json();
                setAnswerResponses(data['answer_responses']);
                setQuestionPosts(data['question_posts']);
                setLogins(data['logins']);
            }
        };
        fetchActivities();
    }, []);

    return (
        <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12} sm={12} lg={12} xl={3}>
                <Logins logins={logins} />
            </Grid>
            <Grid item xs={12} sm={12} lg={12} xl={9}>
                <AnswerResponses answerResponses={answerResponses} />
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
                <QuestionPosts questionPosts={questionPosts} />
            </Grid>
        </Grid>
    );
};

export default ActivityLog;