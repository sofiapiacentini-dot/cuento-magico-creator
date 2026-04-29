DROP POLICY IF EXISTS "Anyone can mark their current story as paid" ON public.stories;

CREATE POLICY "Draft stories can be marked as paid"
ON public.stories
FOR UPDATE
TO anon, authenticated
USING (paid = false)
WITH CHECK (paid = true);

REVOKE EXECUTE ON FUNCTION public.handle_new_user_profile() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;