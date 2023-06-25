import React from 'react'
import PropTypes from 'prop-types'
import {Button,ButtonGroup} from 'reactstrap'

const FilterController = ({handleFilter}) =>{
    return(
        <ButtonGroup>
            <Button className='mr-2' onClick={()=>handleFilter('all')}>All</Button>
            <Button className='mr-2' color='warning' onClick={()=>handleFilter('running')}>Running</Button>
            <Button color='danger' onClick={()=>handleFilter('completed')}>Completed</Button>
        </ButtonGroup>
    )
}

FilterController.propTypes = {
    handleFilter : PropTypes.func.isRequired
}

export default FilterController