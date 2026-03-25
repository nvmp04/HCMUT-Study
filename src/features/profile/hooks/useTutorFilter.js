export function useTutorFilter(tutors, activeCategory, searchTerm){
    return tutors.filter(tutor => {
      const matchesCategory = activeCategory === 'all' || tutor.department === activeCategory;
      const matchesSearch =
        tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.subjects.some(subject =>
          subject.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const banned = tutor.banned === true;
      return matchesCategory && matchesSearch && !banned;
    }) || [];
}