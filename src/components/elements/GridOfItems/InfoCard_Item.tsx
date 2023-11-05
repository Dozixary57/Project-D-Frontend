import './InfoCard_Item.scss';
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import itemService from '../../../backend/services/itemService';
import dataLoadingSprite from '../../../images/DataLoadingSprite.webp';

import WebSocket from 'react-use-websocket'

import ParallaxTilt from 'react-parallax-tilt'

interface Items {
    _id: string;
    Title: string;
    CoverURL: string;
}

export function InfoCard_Item() {

/*    const { sendMessage, lastJsonMessage } = WebSocket('ws://localhost:5000/Items-WS', {
        onOpen: () => {
            console.log('WebSocket connection established.');
        },
        onClose: () => {
            console.log('WebSocket connection closed.')
        }
    });*/

    /*    useEffect(() => {
        const socket = new WebSocket('ws://localhost:5000'); // Подставьте ваш хост и порт

        socket.onopen = () => {
            console.log('WebSocket connection opened');
        };

        socket.onmessage = event => {
            const data = JSON.parse(event.data);
            console.log('Received:', data);
            // Обновите состояние вашего React-компонента на основе полученных данных
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            socket.close();
        };
    }, []);*/

    const [items, setItems] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await itemService.getItems();
                await new Promise(resolve => setTimeout(resolve, 1300));
                setItems(res);
            } catch (error) {
                if (error) throw error
            }
        };

        fetchData();
    }, [])

    const renderItem = (items: Items) => {
        return (
            <Link key={items._id} to={`/Content/Item/${items.Title.replace(/ /g, "_")}`} className='LinkStyle'>
                <div className='CardOfItem'>
                    <figure className='Card'>
                        <ParallaxTilt tiltMaxAngleX={35} tiltMaxAngleY={35} perspective={400} tiltReverse={true} className="ParallaxEffectCard">
                            <img className="ParallaxEffectItem" src={items.CoverURL ? items.CoverURL : require('../../../images/objects/NoThumbnailObjectIcon.png')} alt={items.Title} />
                            <figcaption className="ParallaxEffectTitle">{items.Title}</figcaption>
                        </ParallaxTilt>
                    </figure>
                </div>
            </Link>
        );
    };

    return (
        <>
            {(items && items.length > 0) ? (
                <>
                    { items.map((item: Items) => renderItem(item)) }
                </>
            ) : (
                <div className="dataLoadingSpriteContainer" style={{textAlign: "center"}}>
                    <img src={dataLoadingSprite} alt="Loading..."/>
                    <p>Loading...</p>
                </div>
            )}
        </>
    )
}