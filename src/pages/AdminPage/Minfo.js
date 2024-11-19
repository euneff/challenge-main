import React, { useEffect, useState } from "react";
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import host from "../../api";


const Minfo = () => {
    const location = useLocation();
    const [posts, setPosts] = useState([]);
    const {challengeId} = useParams();
    const token = localStorage.getItem('auth-token');

    useEffect(() => {
        const fetchMoney = async () => {
            try {
                const response = await axios.get(`${host}challenge/${challengeId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    }
                });
                setPosts(response.data.result[0]);
            } catch (error) {
                console.error("Error fetching challenges:", error);
            }
        };

        fetchMoney();
    }, []);

    return (
        <div>
            <h2>{posts.description}</h2>
            <p>조회수: {posts.views}</p>
            <p>투표수: {posts.votes}</p>
            <p>보상금: {posts.reward}</p>
        </div>
    );
};

export default Minfo;