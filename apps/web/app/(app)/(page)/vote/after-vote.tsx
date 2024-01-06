'use client'

import { Vote, Candidate } from '@prisma/client'

interface Props {
  vote: Vote & { candidate: Candidate }
}

export const AfterVote = ({ vote }: Props) => {
  return (
    <section>
      <section>
        <section>
          <h3>Terimakasih udah voting!</h3>

          <p>Berhubung gabisa nyelupin jari ke tinta, jadi kamu dapet tanda ini aja ya 😁</p>
        </section>

        <section>This is a card</section>
      </section>
      <section>
        <h4>Kandidat pilihanmu</h4>

        <h4>KONTOL & MEMEK</h4>

        <div>
          <p>Some image here</p>
        </div>
      </section>
    </section>
  )
}
