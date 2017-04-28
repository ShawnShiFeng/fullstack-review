import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => (
  <div>
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
    </div>

    <div>
      <h4> Repo List </h4>
      <ol>
      {
        props.repos.map(function (doc, index) {
          return <li key={index}><RepoListEntry prop={doc} /></li>
        })
      }
      </ol>
    </div>
  </div>
)

export default RepoList;