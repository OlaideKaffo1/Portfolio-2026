-- Ask Olaide: the conversation log, and the usage numbers the server checks before each answer.
-- Run once in the Supabase SQL editor. Only the server (with the service role key) can read or write.

create table if not exists public.ask_log (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  conversation text not null default '',   -- random id per chat, made in the visitor's browser
  visitor text not null,                   -- salted hash of the IP address; the address is never stored
  page text not null default '',           -- the page the visitor asked from
  question text not null,
  answer jsonb,
  status text not null default 'ok',       -- 'ok' or 'error'
  ms integer not null default 0,
  input_tokens integer not null default 0,
  output_tokens integer not null default 0,
  cache_read_tokens integer not null default 0,
  cache_write_tokens integer not null default 0,
  cost_usd numeric(10, 6) not null default 0
);

create index if not exists ask_log_visitor_time on public.ask_log (visitor, created_at desc);
create index if not exists ask_log_time on public.ask_log (created_at desc);

-- No policies: the public (anon) key can't touch the table at all
alter table public.ask_log enable row level security;

-- Questions from one visitor in the last minute, hour and day, and this month's total spend
create or replace function public.ask_usage(p_visitor text)
returns json
language sql
stable
security definer
set search_path = public
as $$
  select json_build_object(
    'minute', (select count(*) from ask_log where visitor = p_visitor and created_at > now() - interval '1 minute'),
    'hour',   (select count(*) from ask_log where visitor = p_visitor and created_at > now() - interval '1 hour'),
    'day',    (select count(*) from ask_log where visitor = p_visitor and created_at > now() - interval '1 day'),
    'month_cost', (select coalesce(sum(cost_usd), 0) from ask_log where created_at >= date_trunc('month', now() at time zone 'utc') at time zone 'utc')
  );
$$;

revoke all on function public.ask_usage(text) from public, anon, authenticated;
grant execute on function public.ask_usage(text) to service_role;

-- Keep a year of conversations; older ones are deleted. Needs the pg_cron extension
-- (Database → Extensions → pg_cron). Skip this block if you'd rather delete by hand.
-- select cron.schedule('ask-log-retention', '0 3 * * *', $$delete from public.ask_log where created_at < now() - interval '12 months'$$);
