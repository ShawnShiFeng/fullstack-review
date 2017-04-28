import React from 'react';

const RepoListEntry = (props) => (
    <div>
       <p>handle:  {props.prop.handle}</p>
       <p>id: {props.prop.id}</p>
       <p>name:  {props.prop.name}</p>
       <p>url:  {props.prop.html_url}</p>
    </div>
)

export default RepoListEntry;