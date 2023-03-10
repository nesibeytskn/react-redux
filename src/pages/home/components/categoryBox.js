function CategoryBox(props) {
    //console.log('>> Category Box Props', props)
  
    return (
      <div className="col">
        <div className="card mb-4 rounded-3 shadow-sm">
          <div className="card-header py-3">
            <h4 className="my-0 fw-normal">
              {props.name}
            </h4>
          </div>
          <div className="card-body">
            <a href={props.href}>
              <img src={props.image} style={{width: '100%', height: '300px'}} />
            </a>
          </div>
        </div>
      </div>
  
    )
  }
  
  export default CategoryBox