import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Link } from "react-router-dom"
import { Badge } from "./ui/badge"
import dayjs from "dayjs"
import { ArrowRight } from "lucide-react"
import { useRooms } from "@/http/use-rooms"

export function RoomList() {

    const { data, isLoading } = useRooms()
    
    return (
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
                    {isLoading && <p className='text-muted-foreground text-sm'>
                        Carregando salas...
                        </p>}

                    {data?.map((room) => {
                        return( 
                            <Link className='flex items-center justify-between p-3 hover:bg-accent' key={room.id} to={`/rooms/${room.id}`}>
                                <div className='flex flex-1 flex-col gap-1'>
                                    <h3 className='font-medium'>{room.name}</h3>
                                    <div className='flex items-center gap-2'>
                                        <Badge className='text-xs' variant="secondary"> 
                                            {dayjs(room.createdAt).toNow()}
                                        </Badge>

                                        <Badge className='text-xs' variant="secondary">
                                            {room.questionsCount} Pergunta(s)
                                        </Badge>
                                    </div>
                                </div>

                                <span className='flex items-center gap-2'>
                                    Entrar
                                    <ArrowRight className='size-3'/>
                                </span>
                            </Link>
                        )
                    })}
                </CardContent>
        </Card>
    )
}