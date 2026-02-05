import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="p-2">
            <h3>Bem-vindo ao Dashboard!</h3>
            <p>Essa é a página inicial.</p>
        </div>
    )
}