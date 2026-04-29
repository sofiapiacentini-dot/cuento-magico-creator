CREATE POLICY "Paid stories can attach an email"
ON public.stories
FOR UPDATE
TO anon, authenticated
USING (paid = true)
WITH CHECK (paid = true);