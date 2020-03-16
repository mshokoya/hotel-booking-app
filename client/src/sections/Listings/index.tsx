// export * from './Listings';

import React from 'react';
import "./styles/Listings.css";
import {gql} from 'apollo-boost';
import {useQuery, useMutation} from 'react-apollo';
import {Listings as ListingData} from './__generated__/Listings'
import {DeleteListing as DeleteListingData, DeleteListingVariables} from './__generated__/DeleteListing';
import {List, Avatar, Button, Spin, Skeleton, Alert} from 'antd';
// import Avatar from 'antd/es/avatar';
// import Button from 'antd/es/button';

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      address
      image
      price
      numOfGuests
      numOfBeds
      rating
    }  
  }
`

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!){
    deleteListing(id: $id){
      id
      title
      price
      rating
    }
  }
`

interface Props {
  title: string
}

export const Listings = ({title}: Props) => {
  const {data, error, refetch, loading} = useQuery<ListingData>(LISTINGS);
  const [
    deleteListing, 
    {
      loading: deleteListingLoading, 
      error: deleteListingError
    }
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({variables : {id}})
    refetch();
  }


  const listings = data ? data.listings : null;

  const renderListing = listings ? (
    <List
      itemLayout='horizontal'
      dataSource={listings}
      renderItem={listing => (
        <List.Item 
          actions={[
            <Button 
              type='primary' 
              onClick={() => handleDeleteListing(listing.id)}
            >Delete</Button>
          ]}>
          <List.Item.Meta 
            title={listing.title} 
            description={listing.address} 
            avatar={
              <Avatar
                src={listing.image}
                shape='square'
                size={48}
              />
            }
          />
        </List.Item>
      )}
    />
  ) : null


  if (loading){
    if (error){
      return <Alert 
        type='error'
        message='Uh Oh! Something went wrong - please try again'
      />
    }
    return (
      <div className='listings'>
        <h2>{title}</h2>
        <Skeleton active paragraph={{rows:1}}/>
      </div>
    )
  }

  // if (error){
  //   return <h2>Uh Oh! Something went wrong - please try again</h2>
  // }

  const deleteListingErrorMessage = deleteListingError ? (
    <h4> OH NO Something went wrong with the deletion process</h4>
  ) : null;
  
  return (
    <div className='listings'>
      <Spin spinning={deleteListingLoading}>
        <h1>{title}</h1>
        {renderListing}
        {deleteListingErrorMessage}
      </Spin>
      
    </div>
  )
}