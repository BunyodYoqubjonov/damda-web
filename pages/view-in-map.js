import cls from "../components/hotelMapSection/hotelMapSection.module.scss";
import {GeoObject, Map, YMaps, ZoomControl} from "react-yandex-maps";
import {Container} from "@mui/material"
import React from "react";
import {useRouter} from 'next/router';

export default function ViewInMap(){
    const {query} = useRouter();
    const center = [Number(query?.latitude), Number(query?.longitude)]
    return  <Container>
    <div id='map' className={cls.root}>
        <div className={cls.mapView}>
            <YMaps>
                <Map
                    width='100%'
                    height='100%'
                    state={{zoom: 5, center}}
                    instanceRef={(ref) => {
                        ref && ref.behaviors.disable('scrollZoom')
                    }}
                >
                    <GeoObject
                        options={{ iconColor: '#F19204' }}
                        geometry={{
                            type: 'Point',
                            coordinates: center,
                        }}
                        properties={{ hintContent: query?.title }}
                        modules={['geoObject.addon.hint']}
                    />
                    <ZoomControl
                        options={{
                            size: 'small',
                            zoomDuration: 500,
                            position: {
                                bottom: 50,
                                right: 50,
                            },
                        }}
                    />
                </Map>
            </YMaps>
        </div>
    </div>
    </Container>
}