import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

type GetRoomsAPIResponse = Array<{
    id: string
    name: string
}>

export function CreateRoom() {

    const { data, isLoading } = useQuery({
        queryKey: ['get-rooms'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3333/rooms')
            const result: GetRoomsAPIResponse = await response.json()

            return result
        },
    })

    return (
        <div>
            <div>Create Room</div>

            {isLoading && <p>Carregando...</p>}
            {data && JSON.stringify(data, null, 2)}

            <Link className="underline" to="/room">
                Acessar sala
            </Link>
        </div>
    )
}