import { ref } from "vue";
import decodeHtmlEntities from "@/utils/decodeHtmlEntities";

const baseUrl = import.meta.env.VITE_WP_API_BASE_URL || "https://blog.quality-care.no";

if (import.meta.env.VITE_WP_API_BASE_URL === undefined) {
  console.warn("VITE_WP_API_BASE_URL is not defined in .env file. Using fallback URL.");
}

export const useTestimonials = (limit = 0) => {
  const posts = ref([]);
  const isLoading = ref(true);
  const errorState = ref(null);
  const placeholderImage = "/placeholder.png";

  const fetchCategoryIds = async () => {
    try {
      const response = await fetch(`${baseUrl}/wp-json/wp/v2/categories?per_page=100`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const categories = await response.json();

      const testimonialsCategory = categories.find(cat => cat.slug === "tilbakemeldinger");
      const mestringCategory = categories.find(cat => cat.slug === "mestring");

      const ids = [];
      if (testimonialsCategory) {
        ids.push(testimonialsCategory.id);
      } else {
        console.warn("Fant ikke kategori-ID for 'tilbakemeldinger'.");
      }
      if (mestringCategory) {
        ids.push(mestringCategory.id);
      } else {
        console.warn("Fant ikke kategori-ID for 'mestring'.");
      }

      return ids.length > 0 ? ids : null;

    } catch (error) {
      console.error("Kunne ikke hente kategorier:", error);
      return null;
    }
  };

  const fetchPosts = async () => {
    isLoading.value = true;
    errorState.value = null;
    posts.value = [];

    const categoryIds = await fetchCategoryIds();

    if (categoryIds && categoryIds.length > 0) {
      try {
        const categoriesQueryParam = categoryIds.join(',');
        let url = `${baseUrl}/wp-json/wp/v2/posts?categories=${categoriesQueryParam}&_embed`;

        if (limit > 0) {
          url += `&per_page=${limit}`;
        } else {
          url += `&per_page=100`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.length === 0) {
            console.warn("Ingen testimonial-innlegg funnet for de valgte kategoriene.");
         }

        posts.value = data.map((post) => {
          let featuredImage = placeholderImage;

          if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] && post._embedded['wp:featuredmedia'][0].source_url) {
            featuredImage = post._embedded['wp:featuredmedia'][0].source_url;
          } else if (post.featured_media) {
            console.warn(`Featured media for post ID ${post.id} was not embedded. Using placeholder.`);
          }

          return {
            id: post.id,
            title: decodeHtmlEntities(post.title.rendered),
            role: "Fra bloggen",
            quote: post.excerpt.rendered ? decodeHtmlEntities(post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "").replace(/\[&hellip;\]/, "...")) : "",
            image: featuredImage,
            link: post.link,
          };
        });

      } catch (error) {
        console.error("Kunne ikke hente innlegg:", error);
        posts.value = [];
        errorState.value = error.message || "En feil oppstod under henting av historier."; 
      } finally {
        isLoading.value = false;
      }
    } else {
        const noCategoryErrorMessage = "Fant ingen gyldige kategori-IDer for 'tilbakemeldinger' eller 'mestring'. Kan ikke hente innlegg.";
        console.error(noCategoryErrorMessage);
        errorState.value = noCategoryErrorMessage;
      posts.value = [];
      isLoading.value = false;
    }
  };

  return {
    posts,
    isLoading,
    errorState,
    fetchPosts
  };
};