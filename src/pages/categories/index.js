import {useParams} from 'react-router-dom'


function Categories() {

    const params = useParams()

    return (
        <div>
        <br/>
        Slug: {params.slug}
        </div>
    )

}

export default Categories