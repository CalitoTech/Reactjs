import './App.css'
import { TwitterFollowcard } from './TwitterFollowcard'

const users = [
    { userName: 'kikobeats', name: 'Kiko Beats', isFollowing: true },
    { userName: 'midudev', name: 'Miguel Ángel Durán', isFollowing: false },
    { userName: 'elonmusk', name: 'Elon Musk', isFollowing: false },
    { userName: 'vercel', name: 'Vercel', isFollowing: false },
]
export function App() {
    return (
        <section className='App'>
            {
                users.map(({userName, name, isFollowing}) => (
                    <TwitterFollowcard 
                        key={userName}
                        userName={userName} 
                        initialIsFollowing={isFollowing}
                    >
                        {name}
                    </TwitterFollowcard>
                    ))
            }

        </section>
    )
}