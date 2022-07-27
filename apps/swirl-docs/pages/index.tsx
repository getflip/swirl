import type { NextPage } from 'next';

const Home: NextPage = () => {
    return (
        <main className="w-screen h-screen flex flex-col justify-center items-center">
            <h1 className="text-5xl font-black">
                Welcome to <a href="https://flip-app.dev">flip-app.dev</a>
            </h1>
        </main>
    );
};

export default Home;
