import type { NextPage } from 'next';

const Home: NextPage = () => {
    return (
        <main className="w-screen h-screen flex flex-col justify-center items-center">
            <h1 className="text-5xl font-black">
                Welcome to <a href="https://flip-app.dev">flip-app.dev</a>
            </h1>
            <section className="mt-8 border-8 p-8 font-mono">
                <p>lkasdfj lkajsdflkjasdflk</p>
                <h4 className="text-2xl">todo list</h4>
                <ul className="list-disc">
                    <li>
                        deploy to <a href="https://flipapp.de">flip-app.dev</a>
                    </li>
                    <li>create endpoints</li>
                    <li>implement tailwind</li>
                    <li>use design tokens?</li>
                </ul>
            </section>
        </main>
    );
};

export default Home;
