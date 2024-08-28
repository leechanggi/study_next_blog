'use client';

import React from 'react';
import { Session } from '@supabase/supabase-js';

const SessionContext = React.createContext<Session | null>(null);

export default SessionContext;
