import {Suspense, useState} from "react";

import classNames from "classnames";

import Home from "../pages/Home";

import Loader from "components/Loader";

import style from './index.module.scss';

const App = () => {
    const [theme, setTheme] = useState(sessionStorage.getItem('theme') || 'dark')

    return (
        <div
            className={classNames(
                style.root,
                style[theme]
            )}
        >
            <Suspense fallback={<Loader />}>
                <Home
                    theme={theme}
                    setTheme={setTheme}
                />
            </Suspense>
        </div>
    );
}

export default App;
