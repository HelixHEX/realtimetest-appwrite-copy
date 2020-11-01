import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  allMessages?: Maybe<MessageResponse>;
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  message: MessageProp;
  messages: Array<MessageProp>;
};

export type MessageProp = {
  __typename?: 'MessageProp';
  message: Scalars['String'];
  senderName: Scalars['String'];
  id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  send?: Maybe<MessageResponse>;
};


export type MutationSendArgs = {
  input: MessageInput;
};

export type MessageInput = {
  message: Scalars['String'];
  senderName: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String'];
  senderName: Scalars['String'];
  id: Scalars['String'];
};

export type SendMutationVariables = Exact<{
  message: Scalars['String'];
  senderName: Scalars['String'];
}>;


export type SendMutation = (
  { __typename?: 'Mutation' }
  & { send?: Maybe<(
    { __typename?: 'MessageResponse' }
    & { message: (
      { __typename?: 'MessageProp' }
      & Pick<MessageProp, 'message' | 'senderName'>
    ) }
  )> }
);

export type AllmessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllmessagesQuery = (
  { __typename?: 'Query' }
  & { allMessages?: Maybe<(
    { __typename?: 'MessageResponse' }
    & { messages: Array<(
      { __typename?: 'MessageProp' }
      & Pick<MessageProp, 'id' | 'message' | 'senderName'>
    )> }
  )> }
);

export type NewMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessageSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'message' | 'senderName'>
  ) }
);


export const SendDocument = gql`
    mutation Send($message: String!, $senderName: String!) {
  send(input: {message: $message, senderName: $senderName}) {
    message {
      message
      senderName
    }
  }
}
    `;

export function useSendMutation() {
  return Urql.useMutation<SendMutation, SendMutationVariables>(SendDocument);
};
export const AllmessagesDocument = gql`
    query allmessages {
  allMessages {
    messages {
      id
      message
      senderName
    }
  }
}
    `;

export function useAllmessagesQuery(options: Omit<Urql.UseQueryArgs<AllmessagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllmessagesQuery>({ query: AllmessagesDocument, ...options });
};
export const NewMessageDocument = gql`
    subscription newMessage {
  newMessage {
    id
    message
    senderName
  }
}
    `;

export function useNewMessageSubscription<TData = NewMessageSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewMessageSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewMessageSubscription, TData>) {
  return Urql.useSubscription<NewMessageSubscription, TData, NewMessageSubscriptionVariables>({ query: NewMessageDocument, ...options }, handler);
};