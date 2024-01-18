import express from 'express'
import midtransClient from 'midtrans-client'

const router = express.Router()

router.post("/process-transaction", (req, res) => {
  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      clientKey: "SB-Mid-client-nA3Fa4O3PqBvop0O",
      serverKey: "SB-Mid-server-t8ob2w5oFc9fUtHZtr8PGn7p",
    })

    const parameter = {
      transaction_details: {
        order_id: req.body.order_id,
        gross_amount: req.body.total
      },
      customer_details: {
        first_name: req.body.name
      },
      callbacks: {
        finish: null
      }
    }

    snap.createTransaction(parameter).then((transaction) => {
      const dataPayment = {
        response: JSON.stringify(transaction)
      }
      const token = transaction.token
      res.status(200).json({ message: "berhasil", dataPayment, token: token })
    })


  } catch (error) {
    res.statusCode(500).json({ message: error })
  }
})

export default router