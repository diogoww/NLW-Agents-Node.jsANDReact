import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'

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
        <div className='min-h-screen px-4 py-8'>
            <div className='nx-auto max-w-4xl'>
                <div className='grid grid-cols-2 items-start gap-8'>
                    <div />
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Salas Recentes
                            </CardTitle>
                            <CardDescription>
                                Acesso Rápido para as salas criadas recentemente
                            </CardDescription>
                        </CardHeader>
                            <CardContent className='flex flex-col gap-3'>
                                {data?.map((room) => {
                                    return <div key={room.id} className='flex items-center justify-between p-3 hover:bg-accent'>
                                        <div>
                                            <h3 className='font-medium'>{room.name}</h3>
                                        </div>
                                    </div>
                                })}
                            </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}