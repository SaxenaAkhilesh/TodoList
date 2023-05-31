import userDb from "../model/signUpSchema.js";



export const DataAdd = async (req, res) => {
    const { title, content, id,complete } = req.body;
    console.log(title, content, id,complete);
    try {
        const ResponseUpdate = await userDb.findOneAndUpdate({ _id: id }, {
            $push: {
                list: {
                    title: title,
                    content: content,
                    complete:complete
                }
            }
        }, { new: true }
        )
        if (ResponseUpdate) {
            res.status(201).json({ message: "Data Update succesfully", ResponseUpdate, status: 201 })
        } else {
            res.status(404).json({ error: "Unsuccesful Update Data", status: 404 })
        }

    } catch (error) {
        res.status(422).json({ error: "Unsuccesful Update Data", status: 422 })
    }
}