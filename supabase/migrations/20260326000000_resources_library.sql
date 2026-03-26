-- ============================================
-- BIBLIOTECA DE RECURSOS — Multi-org
-- ============================================
-- Tabla central para libros, artículos y otros recursos académicos
-- de todas las organizaciones del ecosistema Fortius.
-- Diseñada para comenzar con Escuela Hispánica y extenderse a IEAM, MD, etc.

CREATE TABLE IF NOT EXISTS resources (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) NOT NULL,

  -- Clasificación
  category        TEXT NOT NULL CHECK (category IN ('libro', 'articulo', 'otro')),

  -- Tipo de enlace: PDF servido desde Supabase Storage, o URL externa
  link_type       TEXT NOT NULL DEFAULT 'external'
                    CHECK (link_type IN ('pdf', 'external')),

  -- Cita bibliográfica completa (texto plano)
  citation        TEXT NOT NULL,

  -- URL del recurso (Storage público para PDFs, URL absoluta para externos)
  url             TEXT,

  -- Orden de visualización dentro de la categoría
  display_order   INT DEFAULT 0,

  status          TEXT DEFAULT 'published'
                    CHECK (status IN ('draft', 'published', 'archived')),

  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Índices de consulta frecuente
CREATE INDEX IF NOT EXISTS idx_resources_org_category
  ON resources (organization_id, category)
  WHERE status = 'published';

-- Row Level Security
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Published resources viewable by everyone" ON resources;
CREATE POLICY "Published resources viewable by everyone"
  ON resources FOR SELECT
  USING (status = 'published');

-- Admins y editores de la org pueden gestionar recursos
DROP POLICY IF EXISTS "Org admins can manage resources" ON resources;
CREATE POLICY "Org admins can manage resources"
  ON resources FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_memberships um
      WHERE um.user_id = auth.uid()
        AND um.organization_id = resources.organization_id
        AND um.role IN ('editor', 'admin', 'super_admin')
        AND um.status = 'active'
    )
  );

-- ============================================
-- STORAGE BUCKET: library-docs
-- ============================================
-- Bucket público para servir PDFs de la biblioteca.
-- Nombrar archivos como: {org_slug}/{filename}.pdf
-- Ejemplo: escuela-hispanica/School_of_Salamanca_The.pdf

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'library-docs',
  'library-docs',
  true,
  52428800,  -- 50 MB máx por archivo
  ARRAY['application/pdf', 'application/octet-stream']
)
ON CONFLICT (id) DO NOTHING;

-- Política de lectura pública para el bucket
DROP POLICY IF EXISTS "Public read on library-docs" ON storage.objects;
CREATE POLICY "Public read on library-docs"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'library-docs');

-- Política de escritura para admins de cualquier org
DROP POLICY IF EXISTS "Org admins can upload to library-docs" ON storage.objects;
CREATE POLICY "Org admins can upload to library-docs"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'library-docs'
    AND EXISTS (
      SELECT 1 FROM user_memberships um
      WHERE um.user_id = auth.uid()
        AND um.role IN ('editor', 'admin', 'super_admin')
        AND um.status = 'active'
    )
  );

DO $$
DECLARE
  eh_org_id UUID;
BEGIN
  -- 1. Obtener el ID de Escuela Hispanica
  SELECT id INTO eh_org_id FROM organizations WHERE slug = 'escuela-hispanica';

  IF eh_org_id IS NULL THEN
    RAISE EXCEPTION 'Organization escuela-hispanica not found';
  END IF;

  -- 2. Limpiar datos de prueba anteriores para evitar duplicados
  DELETE FROM resources WHERE organization_id = eh_org_id;

  -- 3. Insertar recursos

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'libro', 'external', 'Azevedo Alves, A. & Moreira, J. M. (2013). The Salamanca School, Major Conservative and Libertarian Thinkers Vol. 9, Bloomsbury: London.', NULL, 1);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'libro', 'external', 'Azevedo Alves, A. (2017). ''Vitoria, the Common Good and the Limits of Political Power'', en At the Origins of Modernity, Springer, pp. 63-75.', NULL, 2);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'libro', 'pdf', 'Beorlegui, C. (2017). Martín de Azpilcueta. Un artífice de la Modernidad, Cuadernos de Cristianismo y Economía de Mercado 10, Unión Editorial & Centro Diego de Covarrubias, Madrid.', '/docs/escuela-hispanica/beorlegui-2017-martin-de-azpilcueta.pdf', 3);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'libro', 'external', 'Boeira, M. (2018). A Escola de Salamanca e a fundação constitucional do Brasil, Editora UNISINOS.', NULL, 4);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'libro', 'external', 'Chafuen, A. A. (1986). Christians for Freedom: Late Scholastic Economics, Ignatius Press, San Francisco.', NULL, 5);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'libro', 'external', 'Chafuen, A. A. (1991). Economía y ética. Raíces cristianas de la economía de libre mercado, Rialp, Madrid.', NULL, 6);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'libro', 'pdf', 'De Carvalho, M. S., Lárazo Pulido, M., Guidi, S. (eds.) (2020). Francisco Suárez: Metafísica, Política e Ética, Imprensa da Universidade de Coimbra.', '/docs/escuela-hispanica/carvalho-2020-francisco-suarez.pdf', 7);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'libro', 'external', 'Gómez Rivas, L. (2019). Campeones de la libertad. Los maestros de la Segunda Escolástica española e iberoamericana, Cuadernos de Cristianismo y Economía de Mercado, Unión Editorial & Centro Diego de Covarrubias.', NULL, 8);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'libro', 'external', 'Gómez Rivas, L. (coord.), Boceta Álvarez, V., Martín de la Hoz, J. C. & Huerta de Soto, J. (2019). Don Diego de Covarrubias. Un defensor de la libertad política y económica en la Escuela de Salamanca, Cuadernos de Cristianismo y Economía de Mercado, Unión Editorial & Centro Diego de Covarrubias.', NULL, 9);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'libro', 'external', 'Gómez Rivas, L. (2021). Escolástica e independencia: Las bibliotecas jesuitas al tiempo de la emancipación.', NULL, 10);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'libro', 'external', 'Gonnet, J. S. (2002). La Universidad de Salamanca y la Constitución de los Estados Unidos de América, Universidad Pontificia Argentina.', NULL, 11);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'libro', 'pdf', 'Grice-Hutchinson, M. (1952). The School of Salamanca: Readings on the Spanish Monetary Theory 1554-1605, Oxford University Press: Londres.', '/docs/escuela-hispanica/grice-hutchinson-1952-school-of-salamanca.pdf', 12);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'libro', 'external', 'Grice-Hutchinson, M. (2022). La Escuela de Salamanca: Lecturas sobre teoría monetaria española, Unión Editorial & Centro Diego de Covarrubias, Madrid.', NULL, 13);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'libro', 'external', 'Moreira, J. M. & Azevedo Alves, A. (2018). De Salamanca a Coímbra y Évora. Caminos cruzados de una escuela singular, Universidad Francisco de Vitoria, Madrid.', NULL, 14);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'libro', 'external', 'Rager, J. C. (1995). The Political Philosophy of St. Robert Bellarmine.', NULL, 15);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'libro', 'external', 'Zorroza Huarte, I. (ed.) (2023). Antropología del dominio y la propiedad en la Escuela de Salamanca, Universidad Pontificia de Salamanca & Editorial Sindéresis.', NULL, 16);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'external', 'Aldana, E. (2018). ''¿Influencia escolástica en los movimientos independentistas de América Latina?'', Universidad Francisco Marroquín.', 'https://newmedia.ufm.edu/video/influencia-escolastica-en-los-movimientos-independentistas-de-america-latina/', 17);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'external', 'Azevedo Alves, A. & Moreira, J. M. (2013). ''Virtue and Commerce in Domingo de Soto''s Thought: Commercial Practices, Character, and the Common Good'', Journal of Business Ethics, Volume 113, pp. 627–638.', NULL, 18);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'pdf', 'Domingo Oslé, R. (2022). ''Repensar la Escuela de Salamanca: Presentación de publicaciones recientes'', Isidorianum 31/1 (2022), pp. 159-174.', '/docs/escuela-hispanica/domingo-osle-2022-repensar-escuela.pdf', 19);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'external', 'Fernandez Luiña, E. (2007). ''Saavedra Fajardo y la Escuela de Salamanca'', Empresas políticas, 8 (2007), pp. 121-134.', NULL, 20);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'external', 'Gómez Rivas, L. (2010). ''Independencias'', Instituto Juan de Mariana.', 'https://juandemariana.org/independencias/', 21);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'external', 'Gómez Rivas, L. (2015). ''¿Hay una Escuela Ibérica de economía, derecho o pensamiento económico?'', Instituto Juan de Mariana.', 'https://juandemariana.org/ijm-actualidad/analisis-diario/hay-una-escuela-iberica-de-economia-derecho-o-pensamiento-economico/', 22);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'external', 'Gómez Rivas, L. (2017). ''¿Conoció George Mason a los escolásticos españoles?'', Instituto Juan de Mariana.', 'https://juandemariana.org/george-mason-conocio-a-los-escolasticos-espanoles/', 23);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'pdf', 'Gómez Rivas, L. (2020). ''Liberalismo, capitalismo y la segunda escolástica salmantina ¿qué podemos aprender?'', Revista Fe y Libertad, Vol. 3, 1-2 (2020).', '/docs/escuela-hispanica/gomez-rivas-2020-liberalismo.pdf', 24);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'pdf', 'Graf, E.-C. (2014). ''Juan de Mariana y la política monetaria estadounidense moderna. Salamanca, Cervantes, Jefferson y la Escuela Austriaca'', Procesos de Mercado: Revista Europea de Economía Política, Vol. 11, 1, Primavera 2014, pp. 67-103.', '/docs/escuela-hispanica/graf-2014-juan-de-mariana.pdf', 25);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'pdf', 'Graf, E.-C. (2018). ''Juan de Mariana and Miguel de Cervantes: The School of Salamanca and the Invention of the Modern Novel'', Quarterly Journal of Austrian Economics 21(2), pp. 137-146.', '/docs/escuela-hispanica/graf-2018-juan-de-mariana-cervantes.pdf', 26);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'pdf', 'Graf, E.-C. (2019). ''Escolásticos: Francisco Suárez, Juan de Mariana y las revoluciones en América. Bicentenario de la independencia 1810-30''. Credencial Historia, Bogotá, pp. 42-51.', '/docs/escuela-hispanica/graf-2019-escolasticos-francisco-suarez.pdf', 27);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'pdf', 'Graf, E.-C. (2024). ''Thomas Jefferson y la metalépsis atmosférica'', Cuadernos FAES de pensamiento político 81, pp. 91-102.', '/docs/escuela-hispanica/graf-2024-thomas-jefferson.pdf', 28);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'external', 'Huerta de Soto, J. (2020). ''Juan de Mariana y los escolásticos españoles. Homenaje al profesor Octavio Uña'', Procesos de Mercado: Revista Europea de Economía Política, Vol. 17, 2, Otoño 2020, pp. 415-433.', NULL, 29);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'external', 'Rager, J. C. (1925). ''The Blessed Cardinal Bellarmine''s Defense of Popular Government in the Sixteenth Century''. The Catholic Historical Review, Vol. 10, No. 4 (Jan., 1925).', 'https://www.jstor.org/stable/pdf/25012120.pdf', 30);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'external', 'Rev. John C. Rager, S.T.D. (1928). ''Catholic Sources and the Declaration of Independence''. American Catholic Historical Association.', 'https://www.evangelizationstation.com/htm_html/Political%20&%20Social%20Issues/Political%20Issues/catholic_sources_and_the_declara.htm', 31);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'pdf', 'Ríos de Rodríguez, C. (2020). ''Juan de Mariana, Public Choice y la constitución fiscal: los límites efectivos al poder político''. Revista Fe y Libertad, Vol. 3, 1-2 (2020).', '/docs/escuela-hispanica/rios-rodriguez-2020-juan-de-mariana.pdf', 32);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'external', 'Schwartz Girón, P. (2021). ''El legado de la Escuela de Economía de Salamanca. Una evaluación actual'', Procesos de Mercado: Revista Europea de Economía Política, Vol. 18, 2, Otoño 2021, pp. 149-226.', 'https://escuelaiberica.squarespace.com/s/El-legado-de-la-Escuela-de-Economia-de-Salamanca', 33);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'pdf', 'Stoetzer, C. (1981). ''Las raíces escolásticas de la Revolución Americana''. Ponencia sometida a la consideración de las XV Jornadas-Seminario internacional de la Asociación Argentina de Estudios Americanos. Buenos Aires, R.A., 18-21 de Septiembre de 1981.', '/docs/escuela-hispanica/stoetzer-1981-raices-escolasticas.pdf', 34);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'pdf', 'Termes, R. (2000). ''Francisco Suárez y The Fundamental Orders de Connecticut'', Cuadernos de Ciencias Económicas y Empresariales, 37, pp. 161-168.', '/docs/escuela-hispanica/termes-2000-francisco-suarez.pdf', 35);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'external', 'Termes, R. (2005). ''La tradición hispana de libertad'', Conferencia en un encuentro del Instituto Acton en Orlando, Florida.', NULL, 36);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'external', 'Tourinho, L. (2018). ''A Escola de Salamanca e sua Contribuição à História do Pensamento Econômico'', Universidade Federal da Bahia.', 'https://repositorio.ufba.br/bitstream/ri/28115/1/TCC%20vers%C3%A3o%20final.pdf', 37);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'pdf', 'Zanotti, G. & Estrada, J. (2020). ''La Escolástica Española'', Revista Fe y Libertad, Vol. 3, 1-2 (2020).', '/docs/escuela-hispanica/zanotti-2020-escolastica-espanola.pdf', 38);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'articulo', 'pdf', 'Zorroza, I. (2013). ''Hacia una delimitación de la Escuela de Salamanca'', Revista Empresa y Humanismo Vol. XVI, 1 (2023), Instituto Empresa y Humanismo, Universidad de Navarra, Pamplona.', '/docs/escuela-hispanica/zorroza-2013-delimitacion-escuela.pdf', 39);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'otro', 'external', 'Proyecto de investigación «The School of Salamanca». Max Planck Institute for Legal History and Legal Theory.', 'https://www.lhlt.mpg.de/joint-project/the-school-of-salamanca', 40);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'otro', 'external', 'Página específica del proyecto «The School of Salamanca».', 'https://www.salamanca.school/index.html', 41);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'otro', 'external', 'Curso «La Escuela de Salamanca» (Eric Clifford Graf). Universidad Francisco Marroquín (UFM).', 'https://salamanca.ufm.edu', 42);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'otro', 'external', 'Grupo de investigación «Escuela de Salamanca». Universidad Francisco de Vitoria (UFV).', 'https://www.escueladesalamanca.org', 43);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'otro', 'external', 'Foro Hispanoamericano Francisco de Vitoria. Universidad Francisco de Vitoria (UFV).', 'https://www.ufv.es/foro-hispanoamericano/', 44);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'otro', 'external', 'Thomas Izbicki & Matthias Kaufmann, "School of Salamanca", The Stanford Encyclopedia of Philosophy (Fall 2023 Edition), Edward N. Zalta & Uri Nodelman (eds.).', 'https://plato.stanford.edu/cgi-bin/encyclopedia/archinfo.cgi?entry=school-salamanca', 45);

  INSERT INTO resources (organization_id, category, link_type, citation, url, display_order)
  VALUES (eh_org_id, 'otro', 'external', 'Chafuen, A. (2015). ''Hispanics Finding Roots And Helping Build "Our America"'', Forbes.', 'https://www.forbes.com/sites/alejandrochafuen/2015/10/13/hispanics-finding-roots-and-helping-build-our-america/', 46);

END $$;
