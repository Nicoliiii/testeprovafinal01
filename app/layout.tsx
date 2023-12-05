import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

/* você só precisa editar 3 coisas nesse arquivo: 
1. title: título do projeto
2. description: descrição do projeto
3. linguagem da página
conforme os numeros no código
*/

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Projeto', // 1
  description: 'descrição do projeto, ou deixar em branco', // 2
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR"> {/* 3 (troque lang="en" por lang="pt-BR") */}
      <body className={inter.className}>{children}</body>
    </html>
  )
}