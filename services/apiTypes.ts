export interface APIDocumentText {
  text: string;
}

export interface APIFolders {
  resultSetSize: string;
  startPosition: string;
  endPosition: string;
  totalSetSize: string;
  folders: APIFolderItem[];
}

export interface APIFolderItem {
  name: string;
  type: string;
  owner: {
    userName: string;
    userId: string;
    email: string;
  };
  folderId: string;
  uri: string;
  itemCount: string;
  subFolderCount: string;
  hasSubFolders: string;
}

export interface APIEnvelopes {
  resultSetSize: string;
  startPosition: string;
  endPosition: string;
  totalSetSize: string;
  nextUri: string;
  previousUri: string;
  envelopes: APIEnvelopeItem[];
}

export interface APIEnvelopeItem {
  status: string;
  documentsUri: string;
  recipientsUri: string;
  attachmentsUri: string;
  envelopeUri: string;
  emailSubject: string;
  envelopeId: string;
  customFieldsUri: string;
  notificationUri: string;
  createdDateTime: string;
  lastModifiedDateTime: string;
  initialSentDateTime: string;
  sentDateTime: string;
  statusChangedDateTime: string;
  documentsCombinedUri: string;
  certificateUri: string;
  templatesUri: string;
  expireEnabled: string;
  expireDateTime: string;
  expireAfter: string;
  sender: {
    userName: string;
    userId: string;
    accountId: string;
    email: string;
  };
  purgeState: string;
  isSignatureProviderEnvelope: string;
  anySigner: null;
  envelopeLocation: string;
}

export interface APIEnvelopeDocuments {
  envelopeId: string;
  envelopeDocuments: APIEnvelopeDocumentItem[];
}

export interface APIEnvelopeDocumentItem {
  documentId: string;
  documentIdGuid: string;
  name: string;
  type: string;
  uri: string;
  order: string;
  pages?: {
    pageId: string;
    sequence: string;
    height: string;
    width: string;
    dpi: string;
  }[];
  availableDocumentTypes: {
    type: string;
    isDefault: string;
  }[];
  display: string;
  includeInDownload: string;
  signerMustAcknowledge: string;
  templateRequired: string;
  authoritativeCopy: string;
}

export interface APIAgreeements {
  data: APIAgreementDataItem[];
  response_metadata: {
    response_timestamp: string;
    response_duration_ms: number;
  };
}

export interface APIAgreementDataItem {
  id: string;
  file_name: string;
  type: string;
  category: string;
  status: string;
  parties: {
    id: string;
    name_in_agreement: string;
  }[];
  provisions: {
    effective_date: string;
    expiration_date?: string;
    payment_terms_due_date: string;
    execution_date?: string;
    term_length?: string;
    assignment_type?: string;
    assignment_change_of_control?: string;
    can_charge_late_payment_fees?: boolean;
    late_payment_fee_percent?: number;
    renewal_type?: string;
    renewal_notice_period?: string;
    renewal_notice_date?: string;
    auto_renewal_term_length?: string;
    termination_period_for_cause?: string;
    termination_period_for_convenience?: string;
    confidentiality_obligation_period?: string;
    governing_law?: string;
    jurisdiction?: string;
    nda_type?: string;
    total_agreement_value?: number;
    total_agreement_value_currency_code?: string;
    liability_cap_fixed_amount?: number;
    liability_cap_currency_code?: string;
    liability_cap_duration?: string;
    annual_agreement_value?: number;
    annual_agreement_value_currency_code?: string;
  };
  languages: string[];
  source_name: string;
  source_id: string;
  source_account_id: string;
  metadata: {
    created_at: string;
    modified_at: string;
  };
}

export interface APIAgreementDetails {
  id: string;
  file_name: string;
  type: string;
  category: string;
  status: string;
  parties: {
    id: string;
    name_in_agreement: string;
  }[];
  provisions: {
    effective_date: string;
    expiration_date: string;
    execution_date: string;
    term_length: string;
    assignment_type: string;
    assignment_change_of_control: string;
    payment_terms_due_date: string;
    can_charge_late_payment_fees: boolean;
    late_payment_fee_percent: number;
    renewal_type: string;
    renewal_notice_period: string;
    renewal_notice_date: string;
    auto_renewal_term_length: string;
    termination_period_for_cause: string;
    termination_period_for_convenience: string;
  };
  languages: string[];
  source_name: string;
  source_id: string;
  source_account_id: string;
  metadata: {
    created_at: string;
    modified_at: string;
  };
}
