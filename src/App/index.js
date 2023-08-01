import {Suspense, useState} from "react";
import {Routes, Route} from "react-router-dom";

import classNames from "classnames";

import {router} from "router";

import Loader from "components/Loader";

import style from './index.module.scss';

const App = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')

    return (
        <div
            className={classNames(
                style.root,
                style[theme]
            )}
        >
            <Suspense fallback={<Loader />}>
                <Routes>
                    {
                        router.map(item =>
                            <Route
                                key = {new Date().getTime()}
                                path = {item.path}
                                element = {item.element}
                            />
                        )
                    }
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
